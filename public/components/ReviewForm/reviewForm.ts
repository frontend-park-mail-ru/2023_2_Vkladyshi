import { Component } from '@components/component';
import * as templateReviewForm from '@components/ReviewForm/reviewForm.hbs';

/**
 * Класс рендеринга формы заполенения отзыва
 * @class ReviewForm
 * @typedef {ReviewForm}
 */
export class ReviewForm extends Component {
  /**
   * Метод рендеринга элемента
   * @return {string} html форма заполенения отзыва
   */
  render () {
    return templateReviewForm();
  }
}
