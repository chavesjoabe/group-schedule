import { eachDayOfInterval, endOfMonth, isSunday, isThursday, isTuesday, startOfMonth } from "date-fns";
import { roles } from "../constants/service.constants.js";

export class CrewService {
  static formatDate(date) {
    return new Intl.DateTimeFormat('pt-br').format(date);
  }

  static createServiceCrew(currentCrew, lastCrewArray = []) {
    const serviceCrew =
      currentCrew.map(user => this.findPlayerByRole(currentCrew, user.role, lastCrewArray));
    const response = Object.fromEntries(serviceCrew);
    const extraParticipant = this.getExtraParticipant(response, currentCrew, lastCrewArray);
    const bonds = this.applyUserBonds(currentCrew, response[roles.GUITAR_PLAYER]);
    if (extraParticipant) {
      response.extra = extraParticipant;
    }

    if (!bonds) return response;
    response[bonds.role] = bonds.name;
    return response;
  }

  static getExtraParticipant(userCrew, currentUserList, lastUserList = []) {
    const usersInCrew = Object.values(userCrew);
    const currentListExtraParticipants = currentUserList.filter(user => user.isExtra);
    const availableInCurrentCrew = currentListExtraParticipants.filter(user => !usersInCrew.includes(user.name));
    if (!availableInCurrentCrew.length) {
      return;
    };
    if (lastUserList.length === 0) {
      return availableInCurrentCrew[this.getRandomElement(availableInCurrentCrew)].name;
    }
    const lastUserListNames = lastUserList.map(user => user.name);

    const response = availableInCurrentCrew.filter(user => !lastUserListNames.includes(user))
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

  static findPlayerByRole(userArray, role, lastUserCrew = []) {
    const NOT_FOUND_VALUE = -1;
    const usersByRole = userArray.filter(user => user.role === role);
    const lastCrewUsersByRole = lastUserCrew.filter(user => user.role === role);

    if (lastUserCrew.length === 0) {
      return [role, usersByRole[this.getRandomElement(usersByRole)].name];
    }

    const isCurrentUserInLastCrewIndex =
      lastCrewUsersByRole.length === 0
        ? NOT_FOUND_VALUE
        : usersByRole.findIndex(user => user.name === lastCrewUsersByRole[0].name);

    if (
      usersByRole.length === 1 ||
      isCurrentUserInLastCrewIndex === NOT_FOUND_VALUE
    ) {
      return [role, usersByRole[this.getRandomElement(usersByRole)].name];
    }

    usersByRole.splice(isCurrentUserInLastCrewIndex, 1);

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

    const formatDate = new Intl.DateTimeFormat('pt-br');
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

    const response = [
      ...tuesdays,
      ...thursdays,
      ...sundays,
    ];

    return response.sort((a, b) => {
      return Number(a.split('/')[0] - b.split('/')[0]);
    });
  }

}
