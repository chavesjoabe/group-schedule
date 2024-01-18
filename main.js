import { readFile } from 'node:fs/promises';
import { CrewService } from './services/crew.service.js';

const filename = 'out2.json';

const file = JSON.parse(await readFile(filename));
const year = new Date().getFullYear();
const month = 2 // new Date().getMonth() + 1;

const serviceDays = CrewService.getAllServicesInCurrentMonth(year, month);
const usersByDay = file.map(item => {
  const objCopy = { ...item };
  const toRemoveKeys = ['Index', 'Nome', 'role'];
  toRemoveKeys.forEach(key => Reflect.deleteProperty(objCopy, key));

  const availableServiceDaysEntries =
    Object.entries(objCopy).filter(item => item[1] === 'Sim');

  const formatedObjKeys = availableServiceDaysEntries.map((item) => {
    const isSundayNight = item[0].split(' ').pop() === '(noite)';
    const day = item[0].split(' ')[1];
    const formatDateNumber = (number) => Number(number) > 9 ? number : `0${number}`;
    const prefix = isSundayNight ? ' Night' : '';
    return `${formatDateNumber(day)}/${formatDateNumber(month)}/${year}${prefix}`;
  });

  return {
    name: item.Nome,
    role: item.role,
    bond: item.bond,
    isExtra: item.isExtra,
    availableDays: formatedObjKeys,
  }
})

const serviceCrew = serviceDays.map(item => {
  const serviceDayCrew = [];
  usersByDay.forEach(user => {
    if (user.availableDays.includes(item)) {
      const userResponse = {
        name: user.name,
        role: user.role,
        bond: user.bond,
        isExtra: user.isExtra,
      }
      serviceDayCrew.push(userResponse);
    }
  });
  return {
    serviceDayName: item,
    serviceDayCrew,
  }
});

let lastServiceCrew;
const response = [];

serviceCrew.forEach((item, index) => {
  if (index === 0) {
    const result = {
      serviceDayName: item.serviceDayName,
      serviceDayCrew: CrewService.createServiceCrew(item.serviceDayCrew)
    }
    response.push(result);
    lastServiceCrew = result.serviceDayCrew
  }
  const result = { 
    serviceDayName: item.serviceDayName,
    serviceDayCrew: CrewService.createServiceCrew(item.serviceDayCrew, lastServiceCrew),
  };
  response.push(result);
  lastServiceCrew = result.serviceDayCrew;
});

console.log(response);
