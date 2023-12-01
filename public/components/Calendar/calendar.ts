/* eslint-disable require-jsdoc */
import { Component } from '@components/component';
import * as templateCalendar from '@components/Calendar/calendar.hbs';
import { ROOT } from '@utils/config';
import { actionGetCalendar } from '@store/action/actionTemplates';
import { store } from '@store/store';

const calendar12 = {
  status: 200,
  body: {
    monthName: 'Февраль 2022',
    monthText: 'Календарь релизов',
    days: {
      day1: {
        dayNumber: 1,
        dayNews: 'Неудержимые 1',
      },
      day2: {
        dayNumber: 2,
        dayNews: 'Неудержимые 2',
      },
      day3: {
        dayNumber: 3,
        dayNews: 'Неудержимые 3',
      },
      day4: {
        dayNumber: 4,
        dayNews: '',
      },
      day5: {
        dayNumber: 4,
        dayNews: '',
      },
      day6: {
        dayNumber: 6,
        dayNews: '',
      },
      day7: {
        dayNumber: 7,
        dayNews: '',
      },
      day8: {
        dayNumber: 8,
        dayNews: '',
      },
      day9: {
        dayNumber: 9,
        dayNews: '',
      },
      day10: {
        dayNumber: 10,
        dayNews: '',
      },
      day11: {
        dayNumber: 11,
        dayNews: 'Неудержимые 1',
      },
      day12: {
        dayNumber: 12,
        dayNews: 'Неудержимые 2',
      },
      day13: {
        dayNumber: 13,
        dayNews: 'Неудержимые 3',
      },
      day14: {
        dayNumber: 14,
        dayNews: '',
      },
      day15: {
        dayNumber: 15,
        dayNews: '',
      },
      day16: {
        dayNumber: 16,
        dayNews: '',
      },
      day17: {
        dayNumber: 17,
        dayNews: '',
      },
      day18: {
        dayNumber: 18,
        dayNews: '',
      },
      day19: {
        dayNumber: 19,
        dayNews: '',
      },
      day20: {
        dayNumber: 20,
        dayNews: '',
      },
      day21: {
        dayNumber: 21,
        dayNews: 'Неудержимые 1',
      },
      day22: {
        dayNumber: 22,
        dayNews: 'Неудержимые 2',
      },
      day23: {
        dayNumber: 23,
        dayNews: 'Неудержимые 3',
      },
      day24: {
        dayNumber: 24,
        dayNews: '',
      },
      day25: {
        dayNumber: 25,
        dayNews: '',
      },
      day26: {
        dayNumber: 26,
        dayNews: '',
      },
      day27: {
        dayNumber: 27,
        dayNews: '',
      },
      day28: {
        dayNumber: 28,
        dayNews: 'kek',
      },
      day29: {
        dayNumber: 29,
        dayNews: '',
      },
      day30: {
        dayNumber: 30,
        dayNews: '',
      },
    },
  },
};

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
  render() {
    return store.dispatch(actionGetCalendar()).then((response) => {
      // const result = store.getState('calendarInfo')['body'];
      return templateCalendar(calendar12.body);
    });
  }
}
export const calendar = new Calendar(ROOT);
