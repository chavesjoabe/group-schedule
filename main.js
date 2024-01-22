import { readFile } from 'node:fs/promises';
import { CrewService } from './services/crew.service.js';
import { isSunday, isThursday, isTuesday } from 'date-fns';

const filename = 'out3.json';
const ServiceWeekNamesConstants = {
  SUNDAY: 'Domingo',
  SUNDAY_NIGHT: 'Domingo Noite',
  TUESDAY: 'Terça-feira',
  THURSDAY: 'Quinta-feira',
};

const file = JSON.parse(await readFile(filename));
const year = new Date().getFullYear();
const month = 2 // new Date().getMonth() + 1;

const serviceDays = CrewService.getAllServicesInCurrentMonth(year, month);
const usersByDay = file.map(item => {
  const {
    availableOnSunday,
    availableOnSundayNight,
    availableOnTuesday,
    availableOnThursday,
  } = item;

  return {
    name: item.Nome,
    role: item.role,
    bond: item.bond,
    isExtra: item.isExtra,
    availableOnSunday,
    availableOnSundayNight,
    availableOnTuesday,
    availableOnThursday,
  }
});

const formatStringDate = (dayString) => {
  const [day, month, year] = dayString.split('/');
  return `${year}/${month}/${day}`;
}

const getServiceDayWeekName = (dayString) => {
  const isSundayNight = dayString.split(' ')[1] === 'Night';
  const formatedDate = isSundayNight
    ? formatStringDate(dayString.split(' ')[0])
    : formatStringDate(dayString)

  const date = new Date(formatedDate);

  const isSundayService = isSunday(date);
  const isTuesdayService = isTuesday(date);
  const isThursdayService = isThursday(date);

  const weekDayNames = {
    [ServiceWeekNamesConstants.SUNDAY]: isSundayService && !isSundayNight,
    [ServiceWeekNamesConstants.SUNDAY_NIGHT]: isSundayService && isSundayNight,
    [ServiceWeekNamesConstants.TUESDAY]: isTuesdayService,
    [ServiceWeekNamesConstants.THURSDAY]: isThursdayService,
  }

  const [response] = Object.entries(weekDayNames).filter(item => item[1] === true);

  return response[0];
}

const serviceCrew = serviceDays.map(item => {
  let serviceDayCrew = [];
  const serviceWeekDayName = getServiceDayWeekName(item)

  switch (serviceWeekDayName) {
    case ServiceWeekNamesConstants.SUNDAY:
      serviceDayCrew = usersByDay.filter(user => user.availableOnSunday)
      break;
    case ServiceWeekNamesConstants.SUNDAY_NIGHT:
      serviceDayCrew = usersByDay.filter(user => user.availableOnSundayNight)
      break;
    case ServiceWeekNamesConstants.TUESDAY:
      serviceDayCrew = usersByDay.filter(user => user.availableOnTuesday)
      break;
    case ServiceWeekNamesConstants.THURSDAY:
      serviceDayCrew = usersByDay.filter(user => user.availableOnThursday)
      break;
  }

  return {
    serviceDayName: item,
    serviceWeekDayName,
    serviceDayCrew,
  }
});

let lastServiceCrew;
const response = [];

serviceCrew.forEach((item, index) => {
  const isFirstIteration = index === 0;
  const result = {
    serviceDayName: item.serviceDayName,
    serviceWeekDayName: item.serviceWeekDayName,
    serviceDayCrew: isFirstIteration
      ? CrewService.createServiceCrew(item.serviceDayCrew)
      : CrewService.createServiceCrew(item.serviceDayCrew, lastServiceCrew)
  };

  response.push(result);
  lastServiceCrew = result.serviceDayCrew;
});

// console.log(response);
console.table(response.map((item) => {
  const test = '';
  return {
    serviceDayName: item.serviceDayName,
    weekDayName: item.serviceWeekDayName,
    ...item.serviceDayCrew
  }
}));
