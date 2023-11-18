import { Component } from '@components/component';

import * as templateReview from '@components/Review/review.hbs';
/**
 * Класс создания нижней панели
 * @class Review
 * @typedef {Review}
 */
export class Review extends Component {
  /**
   * Метод для рендеринга HTML кодаf
   * @param reviews
   * @returns {string} html нижней панели
   */
  render (reviews) {
    return templateReview(reviews);
  }
}
