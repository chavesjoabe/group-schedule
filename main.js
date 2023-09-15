import { readFile, writeFile } from 'node:fs/promises';
import { CrewService } from './services/crew.service.js';

const filename = 'out.json';

const file = JSON.parse(await readFile(filename));
const year = new Date().getFullYear();
const month = new Date().getMonth() + 1;

const serviceDays = CrewService.getAllServicesInCurrentMonth(year, month);

const usersByDay = file.map(item => {
  const objCopy = { ...item };
  const toRemoveKeys = ['Index', 'Nome', 'role'];
  toRemoveKeys.forEach(key => Reflect.deleteProperty(objCopy, key));

  const availableServiceDaysEntries =
    Object.entries(objCopy).filter(item => item[1] === 'Sim');
  const formatedObjKeys = availableServiceDaysEntries.map((item) => {
    const day = item[0].split(' ')[1];
    const formatDateNumber = (number) => Number(number) > 9 ? day : `0${number}`;
    return `${formatDateNumber(day)}/${formatDateNumber(month)}/${year}`;
  });

  return {
    name: item.Nome,
    role: item.role,
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

const response = serviceCrew.map((item, index, array) => {
  if (index === 0) {
    return {
      serviceDayName: item.serviceDayName,
      serviceDayCrew: CrewService.createServiceCrew(item.serviceDayCrew)
    }
  }

  return { 
    serviceDayName: item.serviceDayName,
    serviceDayCrew: CrewService.createServiceCrew(item.serviceDayCrew, array[index - 1].serviceDayCrew)
  };
});

console.log(response);
