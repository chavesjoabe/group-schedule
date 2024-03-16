import { describe, test } from 'node:test';
import { deepStrictEqual, strictEqual } from 'node:assert'
import { TeamService } from '../services/team.service.js';
import { roles } from '../constants/service.constants.js';

describe('Create Service Team Tests', () => {

  test('Should create a service team with all band', () => {
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

    const response = TeamService.createServiceTeam(dayServiceUsers);

    deepStrictEqual(response, expected);
  });

  test('Should create the service team with half band', () => {
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

    const response = TeamService.createServiceTeam(dayServiceUsers);

    deepStrictEqual(response, expected);
  });

  test('Should get user name by role', () => {
    const userArray = [
      { name: 'Joabe', role: roles.DRUMMER },
    ];

    const expected = ['drummer', 'Joabe'];
    const response = TeamService.findPlayerByRole(userArray, roles.DRUMMER);

    deepStrictEqual(response, expected, 'Values must be equals');
  });

  test('Should get a random user by role', () => {
    const userArray = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Jim', role: roles.DRUMMER },
    ];

    const expected = ['Joabe', 'Jim'];
    const response = TeamService.findPlayerByRole(userArray, roles.DRUMMER);

    deepStrictEqual(true, expected.includes(response[1]));
  });

  test('Should create a service team with last team user array', () => {

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

    const lastTeam = {
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

    const response = TeamService.createServiceTeam(dayServiceUsers, lastTeam);

    deepStrictEqual(response, expected, 'The team values must be equal');
  });

  test('Should create a team with the same user if have no another one with the role for that day', () => {

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

    const lastTeam = {
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

    const response = TeamService.createServiceTeam(dayServiceUsers, lastTeam);

    deepStrictEqual(response, expected, 'The team values must be equal');
  });

  test('Should get a random element from an array', () => {
    const userList = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Tiago', role: roles.DRUMMER },
    ];

    const result = TeamService.getRandomElement(userList);

    deepStrictEqual(true, result <= 2);
  });

  test('Should format date to dd/mm/aaaa format', () => {
    const date = new Date('01/01/2023');
    const response = TeamService.formatDate(date);
    const expected = '01/01/2023';

    strictEqual(response, expected);
  })

  test('Should get all service days in current month', () => {
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

    const response = TeamService.getAllServicesInCurrentMonth(year, month);
    deepStrictEqual(response, expected);
  });

  test('Should get all service days by week day', () => {
    const year = 2023;
    const month = 9; // september
    const response = TeamService.getServiceDays(year, month);
    const expected = {
      tuesdays: ['05/09/2023', '12/09/2023', '19/09/2023', '26/09/2023'],
      thursdays: ['07/09/2023', '14/09/2023', '21/09/2023', '28/09/2023'],
      sundays: ['03/09/2023', '10/09/2023', '17/09/2023', '24/09/2023']
    }
    deepStrictEqual(response, expected);
  });

  test('Should apply guitar player bond', () => {
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
    const response = TeamService.applyUserBonds(data, 'Dener');
    const expected = { role: roles.MINISTRY, name: 'Ester' };
    deepStrictEqual(response, expected);
  });

  test('Should create service team and apply bond', () => {
    const data = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Dener', role: roles.GUITAR_PLAYER, bond: { name: 'Ester', role: roles.MINISTRY } },
      { name: 'Nathali', role: roles.MINISTRY },
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

    const response = TeamService.createServiceTeam(data);

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

  test('Should insert extra participant in service Team', () => {

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

    const team = TeamService.createServiceTeam(data);

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

    const response = Object.keys(team);
    deepStrictEqual(response, expected)
  });

  test('Should sort service day ministry based on last team', () => {
    const userList = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Tiago', role: roles.GUITAR_PLAYER },
      { name: 'Nathali', role: roles.MINISTRY },
      { name: 'Beto', role: roles.MINISTRY },
      { name: 'Geovania', role: roles.VOCAL_ALTO },
      { name: 'Ione', role: roles.VOCAL_SOPRANO },
      { name: 'Michael', role: roles.VOCAL_TENOR },
      { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
      { name: 'Eber', role: roles.BASSIST },
      { name: 'Isa', role: roles.PIANIST },
      { name: 'Samuel', role: roles.HORN_PLAYER },
      { name: 'Alessandro', role: roles.SAX_PLAYER },
    ];

    const lastTeam = {
      ministry: 'Beto',
    }

    const teamPreview = {
      guitar_player: 'Tiago',
    }

    const expected = 'Nathali';

    const response = TeamService.sortServiceDayMinistry(userList, lastTeam, teamPreview);
    deepStrictEqual(response, expected);
  });

  test('Should sort service day ministry based on last team and get the same ministry if have no another one', () => {
    const userList = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Tiago', role: roles.GUITAR_PLAYER },
      { name: 'Beto', role: roles.MINISTRY },
      { name: 'Geovania', role: roles.VOCAL_ALTO },
      { name: 'Ione', role: roles.VOCAL_SOPRANO },
      { name: 'Michael', role: roles.VOCAL_TENOR },
      { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
      { name: 'Eber', role: roles.BASSIST },
      { name: 'Isa', role: roles.PIANIST },
      { name: 'Samuel', role: roles.HORN_PLAYER },
      { name: 'Alessandro', role: roles.SAX_PLAYER },
    ];

    const lastTeam = {
      ministry: 'Beto',
    }

    const teamPreview = {
      guitar_player: 'Tiago',
    }

    const expected = 'Beto';

    const response = TeamService.sortServiceDayMinistry(userList, lastTeam, teamPreview);
    deepStrictEqual(response, expected);
  });

  test('Should sort service day ministry based on last team and get one of the two remaining ministers', () => {
    const userList = [
      { name: 'Joabe', role: roles.DRUMMER },
      { name: 'Tiago', role: roles.GUITAR_PLAYER },
      { name: 'Beto', role: roles.MINISTRY },
      { name: 'Nathali', role: roles.MINISTRY },
      { name: 'Ester', role: roles.MINISTRY },
      { name: 'Maria', role: roles.MINISTRY },
      { name: 'Geovania', role: roles.VOCAL_ALTO },
      { name: 'Ione', role: roles.VOCAL_SOPRANO },
      { name: 'Michael', role: roles.VOCAL_TENOR },
      { name: 'Deda', role: roles.ACOUSTIC_GUITAR_PLAYER },
      { name: 'Eber', role: roles.BASSIST },
      { name: 'Isa', role: roles.PIANIST },
      { name: 'Samuel', role: roles.HORN_PLAYER },
      { name: 'Alessandro', role: roles.SAX_PLAYER },
    ];

    const lastTeam = {
      ministry: 'Beto',
    }

    const teamPreview = {
      guitar_player: 'Tiago',
    }

    const response = TeamService.sortServiceDayMinistry(userList, lastTeam, teamPreview);
    const expected = ['Maria', 'Nathali'].includes(response);
    deepStrictEqual(true, expected);
  });
});


