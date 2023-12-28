import { Component } from '@components/component';
import * as templateReviewForm from '@components/ReviewForm/reviewForm.hbs';
import { store } from '@store/store';
import {
  actionAddComment,
  actionAddCommentTwo
} from '@store/action/actionTemplates';
import { validateReview } from '@utils/validate';
import { addErrorsActive, insertText } from '@utils/addError';
import { router } from '@router/router';
import { Review } from '@components/Review/review';
import { ROOT } from '@utils/config';

export interface ReviewForm {
  state: {
    fildId: number;
  };
}

/**
 * Класс рендеринга формы заполенения отзыва
 * @class ReviewForm
 * @typedef {ReviewForm}
 */
export class ReviewForm extends Component {
  constructor (ROOT) {
    super(ROOT);
    this.state = {
      fildId: 0
    };
  }
  /**
   * Метод рендеринга элемента
   * @param params
   * @returns {string} html форма заполенения отзыва
   */
  render (params) {
    return templateReviewForm(params);
  }

  event (fildId) {
    this.state.fildId = fildId;
    // const infoHTML = document.querySelector('.additional-info__review');
    const textHTML = document.querySelector(
      '.review-form__body__text'
    ) as HTMLElement;

    if (store.getState('auth').status === 200) {
      if (textHTML) {
        textHTML.style.height = '200px';
      }

      const Event = (event) => {
        event.preventDefault();

        const selectHTML = document.querySelector('.rating__form');

        // @ts-ignore
        const select = parseInt(selectHTML.value);
        // @ts-ignore
        const text = textHTML.value;

        const result = validateReview(text);
        if (!result.result) {
          const errorHTML = document.querySelector('.review-form__body__error');
          addErrorsActive(document.querySelector('.text-area'));
          insertText(errorHTML, result.error);
          return;
        }

        store
          .dispatch(
            actionAddComment({
              film_id: this.state.fildId,
              rating: select,
              text: text
            })
          )
          .then((response) => {
            if (response!['addCommentStatus'] === 200) {
              router.refresh();
            } else {
              document.querySelector('.input__form')!.innerHTML =
                '<h4>Вы уже писали отзыв</h4>';
            }
          });

        store.dispatch(
          actionAddCommentTwo({
            film_id: this.state.fildId,
            rating: select,
            text: text
          })
        );
      };
      const review = document.querySelector('.review-form__body__button');
      review?.addEventListener('click', Event);
    } else if (store.getState('auth').status !== 200) {
    }
  }
}
