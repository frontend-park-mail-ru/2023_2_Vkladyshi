import { View } from '@views/view';
import { collections, ROOT } from '@utils/config';
import { store } from '@store/store';
import {
  actionAlreadyWatched,
  actionUserStatistic,
} from '@store/action/actionTemplates';
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
        // let result = [];
        //
        // result = statistic.map(({ genre_id, count, avg }) => {
        //   const avgPointer = avg;
        //   const { key: genreName, color } =
        //     collections.collection_items.find(
        //       (object) => genre_id === object.value
        //     ) || {};
        //   return {
        //     genreName: genreName,
        //     genreId: genre_id,
        //     count: count,
        //     avg: avg.toFixed(1),
        //     color: color,
        //   };
        // });

        const res = collections.collection_items.map((elem) => {
          const matchedObject = statistic.find(
            (object) => elem.value === object.genre_id
          );
          if (matchedObject) {
            return {
              genreName: elem.key,
              genreId: matchedObject.genre_id,
              count: matchedObject.count,
              avg: matchedObject.avg.toFixed(1),
              color: elem.color,
            };
          } else {
            return {
              genreName: elem.key,
              genreId: elem.value,
              count: 0,
              avg: 0,
              color: elem.color,
            };
          }
        });

        statHTML?.insertAdjacentHTML('beforeend', stat.render(res));
      }
    });

    store.dispatch(actionAlreadyWatched()).then(() => {
      const result = store.getState('alreadyWatched');

      if (result?.status === 200) {
        const slider = new Slider(ROOT);
        const statHTML = document.querySelector('.already-viewed');
        statHTML?.insertAdjacentHTML('beforeend', slider.renderLine());
        // slider.addLine();

        const sliderLiner = document.querySelector('.slider-container');
        const sliderNAme = document.querySelector('.slider-name');

        const filmSelect = new FilmSelection(ROOT);

        sliderNAme?.insertAdjacentHTML(
          'beforeend',
          filmSelect.render(result?.body, 'Последние просмотренные')
        );

        const films = new FilmSelectionPage('');
        if (result?.body?.films?.length > 0) {
          films.addFilmsToPage(sliderLiner, result?.body?.films, true);
          slider.addLine();
        } else {
          const select = document.querySelector('.film-selection_films');
          select?.insertAdjacentHTML(
            'beforeend',
            `<div class="label">Просмотренных ещё нет</div>`
          );
        }
      }
    });
  }

  componentWillUnmount() {}
}
