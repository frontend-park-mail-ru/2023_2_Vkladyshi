import { View } from '@views/view';
import {
  collections,
  errorInputs,
  responseStatuses,
  ROOT,
} from '@utils/config';
import { store } from '@store/store';
import {
  actionAlreadyWatched,
  actionCSRF,
  actionGetSettings,
  actionLogout,
  actionPutSettings,
  actionUserStatistic,
} from '@store/action/actionTemplates';
import {
  addErrorsActive,
  insertInInput,
  insertText,
  removeErrors,
  removeErrorsActive,
  returnError,
} from '@utils/addError';
import {
  validateBirthday,
  validateEmail,
  validateLogin,
  validatePassword,
} from '@utils/validate';
import { dateConverter } from '@utils/dateConverter';
import { router } from '@router/router';
import { inputButton } from '@components/inputButton/inputButton';
import { buttonSubmit } from '@components/ButtonSubmit/buttonSubmit';
import { image } from '@components/Image/image';
import { settings } from '@components/Settings/settings';
import { UserStatistic } from '@components/UserStatistic/userStatistic';
import { FilmSelection } from '@components/FilmSelection/filmSelection';
import { FilmSelectionPage } from '@views/FilmSelectionPage/FilmSelectionPage';
import { Slider } from '@components/Slider/slider';

export interface UserStatisticPage {
  state: {};
}

/**
 * Класс формирование страницы статистики юзера
 * @class UserStatisticPage
 * @typedef {UserStatisticPage}
 */
export class UserStatisticPage extends View {
  private popupEvent: (event) => void;

  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor(ROOT) {
    super(ROOT);
    this.state = {};

    // store.subscribe('getUserStatistic', this.subscribeUserStatistic.bind(this));
  }

  /**
   * Метод создания страницы
   */
  render() {
    this.renderDefaultPage({});
    this.componentDidMount();
  }

  componentDidMount() {
    const contentBlock = document.querySelector('.content-block');
    contentBlock?.insertAdjacentHTML(
      'beforeend',
      '<div class="statistic"></div>'
    );
    contentBlock?.insertAdjacentHTML(
      'beforeend',
      '<div class="already-viewed"></div>'
    );

    const stat = new UserStatistic(ROOT);

    store.dispatch(actionUserStatistic()).then(() => {
      if (store.getState('userStatistic')?.status === 200) {
        const statHTML = document.querySelector('.statistic');
        const statistic = store.getState('userStatistic')?.body;
        let result = [];

        result = statistic.map(({ genre_id, count, avg }) => {
          const avgPointer = avg;
          const { key: genreName, color } =
            collections.collection_items.find(
              (object) => genre_id === object.value
            ) || {};
          return {
            genreName: genreName,
            genreId: genre_id,
            count: count,
            avg: avg.toFixed(1),
            color: color,
          };
        });
        statHTML?.insertAdjacentHTML('beforeend', stat.render(result));
      }
    });

    store.dispatch(actionAlreadyWatched()).then(() => {
      const result = store.getState('alreadyWatched');

      if (result?.status === 200) {
        const slider = new Slider();
        const statHTML = document.querySelector('.already-viewed');
        statHTML?.insertAdjacentHTML('beforeend', slider.renderLine());
        slider.addLine();

        const sliderLiner = document.querySelector('.slider-container');
        const sliderNAme = document.querySelector('.slider-name');

        const filmSelect = new FilmSelection(ROOT);

        sliderNAme?.insertAdjacentHTML(
          'beforeend',
          filmSelect.render(result?.body, 'Последние просмотренные')
        );

        const films = new FilmSelectionPage('');
        films.addFilmsToPage(sliderLiner, result?.body?.films, true);
      }
    });
  }

  componentWillUnmount() {}
}
