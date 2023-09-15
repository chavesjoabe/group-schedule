import { roles } from "../constants/service.constants.js";
import { getRandomElement } from "../index.js";
import { CrewService } from "../services/crew.service.js";
import { once } from 'node:events';

export const crewController = {
  '/crew:get': (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const serviceWeekDays = ['tuesdays', 'thursdays', 'sundays'];
    const serviceDays = CrewService.getServiceDays(year, month);
    const serviceCrew = serviceWeekDays.map(item => {

      const CREWS = [
        [
          { name: 'Joabe', role: roles.DRUMMER },
          { name: 'Nickolas', role: roles.DRUMMER },
          { name: 'Tiago', role: roles.GUITAR_PLAYER },
          { name: 'Jim', role: roles.GUITAR_PLAYER },
          { name: 'Ester', role: roles.VOCAL_MINISTRY },
          { name: 'Pam', role: roles.VOCAL_MINISTRY },
          { name: 'Geovania', role: roles.VOCAL_ALTO },
          { name: 'Nancy', role: roles.VOCAL_ALTO },
          { name: 'Ione', role: roles.VOCAL_SOPRANO },
          { name: 'Jam', role: roles.VOCAL_SOPRANO },
          { name: 'Michael', role: roles.VOCAL_TENOR },
          { name: 'Israel', role: roles.VOCAL_TENOR },
          { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
          { name: 'Nick', role: roles.ACOUSTIC_GUITAR_PLAYER },
          { name: 'Eber', role: roles.BASSIST },
          { name: 'Ryan', role: roles.BASSIST },
          { name: 'Isa', role: roles.PIANIST },
          { name: 'Beto', role: roles.PIANIST },
          { name: 'Samuel', role: roles.HORN_PLAYER },
          { name: 'Sam', role: roles.HORN_PLAYER },
          { name: 'Alessandro', role: roles.SAX_PLAYER },
          { name: 'Ale', role: roles.SAX_PLAYER },
        ],
        [
          { name: 'John', role: roles.DRUMMER },
          { name: 'Mike', role: roles.DRUMMER },
          { name: 'Stanley', role: roles.GUITAR_PLAYER },
          { name: 'Jim', role: roles.GUITAR_PLAYER },
          { name: 'Ester', role: roles.VOCAL_MINISTRY },
          { name: 'Pam', role: roles.VOCAL_MINISTRY },
          { name: 'Geovania', role: roles.VOCAL_ALTO },
          { name: 'Nancy', role: roles.VOCAL_ALTO },
          { name: 'Ione', role: roles.VOCAL_SOPRANO },
          { name: 'Jam', role: roles.VOCAL_SOPRANO },
          { name: 'Michael', role: roles.VOCAL_TENOR },
          { name: 'Israel', role: roles.VOCAL_TENOR },
          { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
          { name: 'Nick', role: roles.ACOUSTIC_GUITAR_PLAYER },
          { name: 'Eber', role: roles.BASSIST },
          { name: 'Ryan', role: roles.BASSIST },
          { name: 'Isa', role: roles.PIANIST },
          { name: 'Beto', role: roles.PIANIST },
          { name: 'Samuel', role: roles.HORN_PLAYER },
          { name: 'Sam', role: roles.HORN_PLAYER },
          { name: 'Alessandro', role: roles.SAX_PLAYER },
          { name: 'Ale', role: roles.SAX_PLAYER },
        ]
      ];

      const response = serviceDays[item].map(serviceDay => {
        return {
          [serviceDay]: CrewService.createServiceCrew(
            CREWS[getRandomElement(CREWS)],
            CREWS[getRandomElement(CREWS)]
          ),
        }
      });

      return {
        [item]: response,
      }
    });

    return res.end(JSON.stringify(serviceCrew));
  },

  '/service-days:get': (req, res) => {
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const response = CrewService.getServiceDays(year, month)
    return res.end(JSON.stringify(response));
  },

  '/create:post': async (req, res) => {
    const rawData = await once(req, 'data');
    const requestBody = JSON.parse(rawData);
    // insert data in database

    res.writeHead(201);
    const response = {
      message: 'User data inserted with success',
      status: 'OK',
      data: requestBody,
    };

    return res.end(JSON.stringify(response));
  }
}
