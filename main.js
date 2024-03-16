import { readFile } from 'node:fs/promises';
import { TeamService } from './services/team.service.js';
import { isSunday, isThursday, isTuesday } from 'date-fns';
import { createInterface } from 'node:readline';
import xlsx from 'json-as-xlsx';

const filename = 'out3.json';
const ServiceWeekNamesConstants = {
  SUNDAY: 'Domingo',
  SUNDAY_NIGHT: 'Domingo Noite',
  TUESDAY: 'Terça-feira',
  THURSDAY: 'Quinta-feira',
};

const file = JSON.parse(await readFile(filename));
const year = new Date().getFullYear();
const month = 3 // new Date().getMonth() + 1;

const serviceDays = TeamService.getAllServicesInCurrentMonth(year, month);
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

const serviceTeam = serviceDays.map(item => {
  let serviceDayTeam = [];
  const serviceWeekDayName = getServiceDayWeekName(item)

  switch (serviceWeekDayName) {
    case ServiceWeekNamesConstants.SUNDAY:
      serviceDayTeam = usersByDay.filter(user => user.availableOnSunday)
      break;
    case ServiceWeekNamesConstants.SUNDAY_NIGHT:
      serviceDayTeam = usersByDay.filter(user => user.availableOnSundayNight)
      break;
    case ServiceWeekNamesConstants.TUESDAY:
      serviceDayTeam = usersByDay.filter(user => user.availableOnTuesday)
      break;
    case ServiceWeekNamesConstants.THURSDAY:
      serviceDayTeam = usersByDay.filter(user => user.availableOnThursday)
      break;
  }

  return {
    serviceDayName: item,
    serviceWeekDayName,
    serviceDayTeam: serviceDayTeam,
  }
});

let lastServiceTeam;
const response = [];

serviceTeam.forEach((item, index) => {
  const isFirstIteration = index === 0;
  const result = {
    serviceDayName: item.serviceDayName,
    serviceWeekDayName: item.serviceWeekDayName,
    serviceDayTeam: isFirstIteration
      ? TeamService.createServiceTeam(item.serviceDayTeam)
      : TeamService.createServiceTeam(item.serviceDayTeam, lastServiceTeam)
  };

  response.push(result);
  lastServiceTeam = result.serviceDayTeam;
});

// console.log(response);
console.table(response.map((item) => {
  return {
    serviceDayName: item.serviceDayName,
    weekDayName: item.serviceWeekDayName,
    ...item.serviceDayTeam,
  }
}));

/**
 * @param {Array} data
 * @returns {void}
 */
const generateXlsx = (data) => {
  const fileData = [{
    sheet: 'escala-louvor',
    columns: [
      { label: 'Dia', value: 'serviceDayName' },
      { label: 'Dia semana', value: 'weekDayName' },
      { label: 'Bateria', value: 'drummer' },
      { label: 'Teclado', value: 'pianist' },
      { label: 'Guitarra', value: 'guitar_player' },
      { label: 'Baixo', value: 'bassist' },
      { label: 'Violao', value: 'acoustic_guitar_player' },
      { label: 'Ministro', value: 'ministry' },
      { label: 'Sobrano', value: 'vocal_soprano' },
      { label: 'Contralto', value: 'vocal_alto' },
      { label: 'Tenor', value: 'vocal_tenor' },
      { label: 'Trompete', value: 'horn_player' },
      { label: 'Sax', value: 'sax_player' },
      { label: 'Extra', value: 'extra' },
    ],
    content: [],
  }];

  data.forEach(item => {
    const content = {
      serviceDayName: item.serviceDayName,
      weekDayName: item.serviceWeekDayName,
      ...item.serviceDayTeam,
    }
    fileData[0].content.push(content);
  });

  const params = {
    fileName: `escala-louvor-${Date.now()}`,
    extraLength: 3,
    writeMode: 'writeFile',
    writeOptions: {},
  }
  xlsx(fileData, params);
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('generate xlsx file? Y or N\n', (res) => {
  switch (res.toUpperCase()) {
    case 'Y':
      generateXlsx(response);
      console.log('done');
      break;
    case 'N':
      console.log('nothing to do XD')
      break;
    default:
      console.log(`there is no action to option ${res} acceptable values: "Y" or "N"`)
      break;
  }
  rl.close()
});
