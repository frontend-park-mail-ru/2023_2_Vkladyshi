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
  render (info) {
    return store.dispatch(actionGetCalendar()).then((response) => {
      const result = store.getState('calendarInfo')['body'];
      return templateCalendar(result);
    });
  }
}
export const calendar = new Calendar(ROOT);
