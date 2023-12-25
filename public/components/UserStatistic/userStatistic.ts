import { Component } from '@components/component';
import * as templateUserStatistic from '@components/UserStatistic/userStatistic.hbs';

/**
 * Класс рендеринга статистики юзера
 * @class UserStatistic
 * @typedef {UserStatistic}
 */
export class UserStatistic extends Component {
  /**
   * Метод рендеринга элемента
   * @param result
   * @return {string} html элемента блока изменения данных
   */
  render(result) {
    console.log(result);
    return templateUserStatistic({ result: result });
  }
}
