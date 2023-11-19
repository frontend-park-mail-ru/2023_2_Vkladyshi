import { Component } from '@components/component';
import * as templateReviewForm from '@components/ReviewForm/reviewForm.hbs';
import { store } from '@store/store';
import { actionAddComment, actionAuth, actionGetCommentsFilm } from '@store/action/actionTemplates';
import { validateReview } from '@utils/validate';
import { addErrorsActive, insertText } from '@utils/addError';
import { router } from '@router/router';

export interface ReviewForm {
  state: {
    fildId: number
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
    const infoHTML = document.querySelector('.additional-info__review');
    const textHTML = document.querySelector('.review-form__body__text') as HTMLElement;
    textHTML.style.height = '200px';

    if (store.getState('auth').status !== 200) {
      // const comments = document.createElement('div');
      // comments.className = 'comments__block';
      //
      // const div1 = document.createElement('div');
      // div1.className = 'comments__all';
      //
      // const div2 = document.createElement('div');
      // div2.className = 'input__form';
      //
      // comments.appendChild(div1);
      // comments.appendChild(div2);
      //
      // const divElement = document.querySelector(
      //   '.additional-info__content.table__row__text'
      // ) as HTMLDivElement;
      // divElement.style.display = 'none';
      //
      // infoHTML?.appendChild(comments);

      // store.dispatch(actionAuth()).then((response) => {
      //   if (
      //     !document.querySelector('.review-form') &&
      //     store.getState('auth').status === 200
      //   ) {
      //     div2?.insertAdjacentHTML(
      //       'beforeend',
      //       this.render({ login: true })
      //     );
      //
      //     const textHTML = document.querySelector('.review-form__body__text') as HTMLElement;
      //     textHTML.style.height = '200px';
      console.log('EVENT')
      const Event = (event) => {
        event.preventDefault();

        console.log(12121)
        const selectHTML = document.querySelector('.rating__form');
        // const textHTML = document.querySelector(
        //   '.review-form__body__text'
        // );

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
            console.log('response')
            if (response!['addCommentStatus'] === 200) {
              router.refresh();
            } else {
                  document.querySelector('.input__form')!.innerHTML =
                    '<h4>Вы уже писали отзыв</h4>';
            }
          });
      };
      const review = document.querySelector('.review-form');
      review?.addEventListener('submit', Event);
    } else if (store.getState('auth').status !== 200) {
      router.go(
        { path: '/login', props: `` },
        { pushState: true, refresh: false }
      );
    }
  }
}
