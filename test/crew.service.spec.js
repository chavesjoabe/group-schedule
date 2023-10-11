import { describe, it } from 'node:test';
import { deepStrictEqual, strictEqual } from 'node:assert'
import { CrewService } from '../services/crew.service.js';
import { roles } from '../constants/service.constants.js';

describe('CreateServiceCrew Tests', () => {

  it('Should create a service crew with all band', () => {
    const dayServiceUsers = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Tiago', role: roles.GUITAR_PLAYER },
      { name: 'Ester', role: roles.MINISTRY },
      { name: 'Geovania', role: roles.VOCAL_ALTO },
      { name: 'Ione', role: roles.VOCAL_SOPRANO },
      { name: 'Michael', role: roles.VOCAL_TENOR },
      { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
      { name: 'Eber', role: roles.BASSIST },
      { name: 'Isa', role: roles.PIANIST },
      { name: 'Samuel', role: roles.HORN_PLAYER },
      { name: 'Alessandro', role: roles.SAX_PLAYER },
    ];

    const expected = {
      drummer: 'Joabe',
      pianist: 'Isa',
      guitar_player: 'Tiago',
      bassist: 'Eber',
      acoustic_guitar_player: 'Deda',
      vocal_alto: 'Geovania',
      vocal_soprano: 'Ione',
      vocal_tenor: 'Michael',
      ministry: 'Ester',
      horn_player: 'Samuel',
      sax_player: 'Alessandro',
    }

    const response = CrewService.createServiceCrew(dayServiceUsers);

    deepStrictEqual(response, expected);
  });

  it('Should create the service crew with half band', () => {
    const dayServiceUsers = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Tiago', role: roles.GUITAR_PLAYER },
      { name: 'Geovania', role: roles.VOCAL_ALTO },
      { name: 'Ione', role: roles.VOCAL_SOPRANO },
      { name: 'Eber', role: roles.BASSIST },
    ];

    const expected = {
      drummer: 'Joabe',
      guitar_player: 'Tiago',
      bassist: 'Eber',
      vocal_alto: 'Geovania',
      vocal_soprano: 'Ione',
    }

    const response = CrewService.createServiceCrew(dayServiceUsers);

    deepStrictEqual(response, expected);
  });

  it('Should get user name by role', () => {
    const userArray = [
      { name: 'Joabe', role: roles.DRUMMER },
    ];

    const expected = ['drummer', 'Joabe'];
    const response = CrewService.findPlayerByRole(userArray, roles.DRUMMER);

    deepStrictEqual(response, expected, 'Values must be equals');
  });

  it('Should get a random user by role', () => {
    const userArray = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Jim', role: roles.DRUMMER },
    ];

    const expected = ['Joabe', 'Jim'];
    const response = CrewService.findPlayerByRole(userArray, roles.DRUMMER);

    deepStrictEqual(true, expected.includes(response[1]));
  });

  it('Should create a service crew with last crew user array', () => {

    const dayServiceUsers = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Nickolas', role: roles.DRUMMER },
      { name: 'Tiago', role: roles.GUITAR_PLAYER },
      { name: 'Dener', role: roles.GUITAR_PLAYER },
      { name: 'Ester', role: roles.MINISTRY },
      { name: 'Geovania', role: roles.VOCAL_ALTO },
      { name: 'Ione', role: roles.VOCAL_SOPRANO },
      { name: 'Michael', role: roles.VOCAL_TENOR },
      { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
      { name: 'Eber', role: roles.BASSIST },
      { name: 'Claudio', role: roles.BASSIST },
      { name: 'Isa', role: roles.PIANIST },
      { name: 'Beto', role: roles.PIANIST },
    ];

    const lastCrew = {
      drummer: 'Joabe',
      guitar_player: 'Tiago',
      ministry: 'Maria',
      vocal_alto: 'Leticia',
      vocal_soprano: 'Nathally',
      vocal_tenor: 'Israel',
      acoustic_guitar_player: 'Nick',
      bassist: 'Eber',
      pianist: 'Isa',
      horn_player: 'Samuel',
      sax_player: 'Alessandro',
    }

    const expected = {
      drummer: 'Nickolas',
      pianist: 'Beto',
      guitar_player: 'Dener',
      bassist: 'Claudio',
      acoustic_guitar_player: 'Deda',
      vocal_alto: 'Geovania',
      vocal_soprano: 'Ione',
      vocal_tenor: 'Michael',
      ministry: 'Ester',
    }

    const response = CrewService.createServiceCrew(dayServiceUsers, lastCrew);

    deepStrictEqual(response, expected, 'The crew values must be equal');
  });

  it('Should create a crew with the same user if have no another one with the role for that day', () => {

    const dayServiceUsers = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Tiago', role: roles.GUITAR_PLAYER },
      { name: 'Dener', role: roles.GUITAR_PLAYER },
      { name: 'Ester', role: roles.MINISTRY },
      { name: 'Geovania', role: roles.VOCAL_ALTO },
      { name: 'Ione', role: roles.VOCAL_SOPRANO },
      { name: 'Michael', role: roles.VOCAL_TENOR },
      { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
      { name: 'Eber', role: roles.BASSIST },
      { name: 'Claudio', role: roles.BASSIST },
      { name: 'Isa', role: roles.PIANIST },
      { name: 'Beto', role: roles.PIANIST },
    ];

    const lastCrew = {
      drummer: 'Joabe',
      guitar_player: 'Tiago',
      ministry: 'Maria',
      vocal_alto: 'Leticia',
      vocal_soprano: 'Nathally',
      vocal_tenor: 'Israel',
      acoustic_guitar_player: 'Nick',
      bassist: 'Eber',
      pianist: 'Isa',
      horn_player: 'Samuel',
      sax_player: 'Alessandro',
  };

    const expected = {
      drummer: 'Joabe',
      pianist: 'Beto',
      guitar_player: 'Dener',
      bassist: 'Claudio',
      acoustic_guitar_player: 'Deda',
      vocal_alto: 'Geovania',
      vocal_soprano: 'Ione',
      vocal_tenor: 'Michael',
      ministry: 'Ester',
    }

    const response = CrewService.createServiceCrew(dayServiceUsers, lastCrew);

    deepStrictEqual(response, expected, 'The crew values must be equal');
  });

  it('Should get a random element from an array', () => {
    const userList = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Tiago', role: roles.DRUMMER },
    ];

    const result = CrewService.getRandomElement(userList);

    deepStrictEqual(true, result <= 2);
  });

  it('Should format date to dd/mm/aaaa format', () => {
    const date = new Date('01/01/2023');
    const response = CrewService.formatDate(date);
    const expected = '01/01/2023';

    strictEqual(response, expected);
  })

  it('Should get all service days in current month', () => {
    const year = 2023;
    const month = 9; // september
    const expected = [
      "03/09/2023",
      "03/09/2023 Night",
      "05/09/2023",
      "07/09/2023",
      "10/09/2023",
      "10/09/2023 Night",
      "12/09/2023",
      "14/09/2023",
      "17/09/2023",
      "17/09/2023 Night",
      "19/09/2023",
      "21/09/2023",
      "24/09/2023",
      "24/09/2023 Night",
      "26/09/2023",
      "28/09/2023"
    ];

    const response = CrewService.getAllServicesInCurrentMonth(year, month);
    deepStrictEqual(response, expected);
  });

  it('Should get all service days by week day', () => {
    const year = 2023;
    const month = 9; // september
    const response = CrewService.getServiceDays(year, month);
    const expected = {
      tuesdays: ['05/09/2023', '12/09/2023', '19/09/2023', '26/09/2023'],
      thursdays: ['07/09/2023', '14/09/2023', '21/09/2023', '28/09/2023'],
      sundays: ['03/09/2023', '10/09/2023', '17/09/2023', '24/09/2023']
    }
    deepStrictEqual(response, expected);
  });

  it('Should apply guitar player bond', () => {
    const data = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Dener', role: roles.GUITAR_PLAYER, bond: { name: 'Ester', role: roles.MINISTRY } },
      { name: 'Nathaly', role: roles.MINISTRY },
      { name: 'Geovania', role: roles.VOCAL_ALTO },
      { name: 'Ione', role: roles.VOCAL_SOPRANO },
      { name: 'Michael', role: roles.VOCAL_TENOR },
      { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
      { name: 'Eber', role: roles.BASSIST },
      { name: 'Isa', role: roles.PIANIST },
      { name: 'Samuel', role: roles.HORN_PLAYER },
      { name: 'Alessandro', role: roles.SAX_PLAYER },
    ];
    const response = CrewService.applyUserBonds(data, 'Dener');
    const expected = { role: roles.MINISTRY, name: 'Ester' };
    deepStrictEqual(response, expected);
  });

  it('Should create service crew and apply bond', () => {
    const data = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Dener', role: roles.GUITAR_PLAYER, bond: { name: 'Ester', role: roles.MINISTRY } },
      { name: 'Nathaly', role: roles.MINISTRY },
      { name: 'Geovania', role: roles.VOCAL_ALTO },
      { name: 'Ione', role: roles.VOCAL_SOPRANO },
      { name: 'Michael', role: roles.VOCAL_TENOR },
      { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
      { name: 'Eber', role: roles.BASSIST },
      { name: 'Isa', role: roles.PIANIST },
      { name: 'Samuel', role: roles.HORN_PLAYER },
      { name: 'Alessandro', role: roles.SAX_PLAYER },
    ];

    const response = CrewService.createServiceCrew(data);

    const expected = {
      drummer: 'Joabe',
      pianist: 'Isa',
      guitar_player: 'Dener',
      bassist: 'Eber',
      acoustic_guitar_player: 'Deda',
      vocal_alto: 'Geovania',
      vocal_soprano: 'Ione',
      vocal_tenor: 'Michael',
      ministry: 'Ester',
      horn_player: 'Samuel',
      sax_player: 'Alessandro',
    };

    deepStrictEqual(response, expected);
  });

  it('Should insert extra participant in service Crew', () => {

    const data = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Dener', role: roles.GUITAR_PLAYER, bond: { name: 'Ester', role: roles.MINISTRY } },
      { name: 'Nathaly', role: roles.MINISTRY },
      { name: 'Geovania', role: roles.VOCAL_ALTO },
      { name: 'Ione', role: roles.VOCAL_SOPRANO },
      { name: 'Michael', role: roles.VOCAL_TENOR, isExtra: true },
      { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
      { name: 'Eber', role: roles.BASSIST },
      { name: 'Isa', role: roles.PIANIST },
      { name: 'Samuel', role: roles.HORN_PLAYER },
      { name: 'Alessandro', role: roles.SAX_PLAYER },
      { name: 'Jim', role: roles.VOCAL_TENOR, isExtra: true },
    ];

    const crew = CrewService.createServiceCrew(data);

    const expected = [
      'drummer',
      'pianist',
      'guitar_player',
      'bassist',
      'acoustic_guitar_player',
      'vocal_alto',
      'vocal_soprano',
      'vocal_tenor',
      'ministry',
      'horn_player',
      'sax_player',
      'extra'
    ];

    const response = Object.keys(crew);
    console.log(response);
    deepStrictEqual(response, expected)
  });

  it('Should sort service day ministry based on bonds and last crew', () => {
    const response = CrewService.sortServiceDayMinistry({}, {});
    deepStrictEqual(response, true);
  });
});


