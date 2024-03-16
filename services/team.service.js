import { eachDayOfInterval, endOfMonth, isSunday, isThursday, isTuesday, startOfMonth } from "date-fns";
import { roles } from "../constants/service.constants.js";
import { crewBonds } from "../constants/crew.bonds.js";

export class TeamService {
  static formatDate(date) {
    return new Intl.DateTimeFormat('pt-br').format(date);
  }

  static createServiceTeam(currentTeam, lastTeam = {}) {
    const INEXISTENT_USER = 'empty';
    const userRoles = Object.values(roles);
    const serviceTeam = userRoles.map(
      role => this.findPlayerByRole(currentTeam, role, lastTeam)
    );

    const filteredServiceTeam = serviceTeam.filter(([key, value]) => value !== INEXISTENT_USER);

    const response = Object.fromEntries(filteredServiceTeam);
    const extraParticipant = this.getExtraParticipant(response, currentTeam, lastTeam);
    const bonds = this.applyUserBonds(currentTeam, response[roles.GUITAR_PLAYER]);
    if (extraParticipant) {
      response.extra = extraParticipant;
    }

    if (!bonds) return response;
    response[bonds.role] = bonds.name;
    response.ministry = this.sortServiceDayMinistry(currentTeam, lastTeam, response);
    return response;
  }

  static sortServiceDayMinistry(currentCrew, lastCrew, crewPreview) {
    const bondUser = crewPreview[roles.GUITAR_PLAYER];
    const ministersToRemove = crewBonds
      .filter(user => user.name !== bondUser)
      .map(item => item.bondName);

    const ministers = currentCrew.filter(user => user.role === roles.MINISTRY);
    if (ministers.length === 1) {
      return ministers[0].name;
    }
    const lastCrewUserNames = Object.values(lastCrew);
    const filteredMinisters = lastCrewUserNames.length === 0 
      ? ministers
      : ministers.filter(ministry => !lastCrewUserNames.includes(ministry.name));
    const ministersWithoutBonds = filteredMinisters.filter(ministry => !ministersToRemove.includes(ministry.name));
    if (ministersWithoutBonds.length === 0) {
      return currentCrew.ministry;
    }
    const response = ministersWithoutBonds[this.getRandomElement(ministersWithoutBonds)].name;
    return response;
  }

  static getExtraParticipant(userCrew, currentUserList, lastUserList = {}) {
    const usersInCrew = Object.values(userCrew);
    const currentListExtraParticipants = currentUserList.filter(user => user.isExtra);
    const availableInCurrentCrew =
      currentListExtraParticipants.filter(user => !usersInCrew.includes(user.name));
    if (!availableInCurrentCrew.length) {
      return;
    };
    if (Object.keys(lastUserList).length === 0) {
      return availableInCurrentCrew[
        this.getRandomElement(availableInCurrentCrew)
      ].name;
    }
    const lastUserListNames = Object.values(lastUserList).map(user => { 
      if (!user) {
        return '';
      }
      return user.name;
    });

    const response =
      availableInCurrentCrew.filter(user => !lastUserListNames.includes(user))
    return response[this.getRandomElement(response)].name;
  }

  static applyUserBonds(userList, guitarPlayer) {
    if (!guitarPlayer) return;
    const guitarPlayerInList = userList.find(user => user.name === guitarPlayer);
    if (!guitarPlayerInList || !guitarPlayerInList.bond) {
      return;
    }
    const { name, role } = guitarPlayerInList.bond;
    return { name, role };
  }

  static getRandomElement(array) {
    return Math.floor(Math.random() * array.length);
  }

  static findPlayerByRole(userArray, role, lastUserCrew = {}) {
    const NOT_FOUND_VALUE = -1;
    const usersByRole = userArray.filter(user => user.role === role);
    const lastCrewUserByRole = lastUserCrew[role];

    if (usersByRole.length === 0) {
      return [role, 'empty'];
    }

    if (Object.keys(lastUserCrew).length === 0) {
      return [role, usersByRole[this.getRandomElement(usersByRole)].name];
    }

    const isCurrentUserInLastTeamIndex =
      lastUserCrew.length === 0
        ? NOT_FOUND_VALUE
        : usersByRole.findIndex(user => user.name === lastCrewUserByRole);

    if (
      usersByRole.length === 1 ||
      isCurrentUserInLastTeamIndex === NOT_FOUND_VALUE
    ) {
      return [role, usersByRole[this.getRandomElement(usersByRole)].name];
    }

    usersByRole.splice(isCurrentUserInLastTeamIndex, 1);

    const response = [role, usersByRole[this.getRandomElement(usersByRole)].name];
    return response;
  }

  static getServiceDays(year, month) {
    const startDate = startOfMonth(new Date(year, month - 1)); // month is 0-indexed
    const endDate = endOfMonth(new Date(year, month - 1)); // month is 0-indexed

    const allDaysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    const tuesdays = allDaysInMonth.filter((day) => isTuesday(day));
    const thursdays = allDaysInMonth.filter((day) => isThursday(day));
    const sundays = allDaysInMonth.filter((day) => isSunday(day));

    return {
      tuesdays: tuesdays.map(item => this.formatDate(item)),
      thursdays: thursdays.map(item => this.formatDate(item)),
      sundays: sundays.map(item => this.formatDate(item)),
    }
  }


  static getAllServicesInCurrentMonth(year, month) {
    const startDate = startOfMonth(new Date(year, month - 1)); // month is 0-indexed
    const endDate = endOfMonth(new Date(year, month - 1)); // month is 0-indexed

    const allDaysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    const tuesdays = allDaysInMonth
      .filter((day) => isTuesday(day))
      .map(item => this.formatDate(item));
    const thursdays = allDaysInMonth
      .filter((day) => isThursday(day))
      .map(item => this.formatDate(item));
    const sundays = allDaysInMonth
      .filter((day) => isSunday(day))
      .map(item => this.formatDate(item));
    const sundayNight = sundays.map((day) => `${day} Night`);

    const response = [
      ...tuesdays,
      ...thursdays,
      ...sundays,
      ...sundayNight,
    ];

    return response.sort((a, b) => {
      return Number(a.split('/')[0] - b.split('/')[0]);
    });
  }
}
