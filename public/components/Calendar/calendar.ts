/* eslint-disable require-jsdoc */
import { Component } from '@components/component';
import * as templateCalendar from '@components/Calendar/calendar.hbs';
import { ROOT } from '@utils/config';
import { actionGetCalendar } from '@store/action/actionTemplates';
import { store } from '@store/store';

/**
 * Класс создания календаря новинок
 * @class Calendar
 * @typedef {Calendar}
 */
class Calendar extends Component {
  /**
   * Метод для рендеринга HTML кода
   * @param info
   * @return {string} html нижней панели
   */
  render () {
    return store.dispatch(actionGetCalendar()).then((response) => {
      const result = store.getState('calendarInfo')['body'];

      const calendar = {
        monthName: result.monthName,
        monthText: result.monthText,
        currentDay: result.currentDay,
        days: Array.from({ length: 30 }, (_, i) => ({
          dayNumber: i + 1,
          dayNews: (result?.days.find(day => day.dayNumber === i + 1)?.dayNews || '')
        }))
      };

      return templateCalendar(calendar);
    });
  }
}
export const calendar = new Calendar(ROOT);
