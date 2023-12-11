import { View } from '@views/view';
import { store } from '@store/store';
import { Statistics } from '@components/Statistics/statistics';
import {
  actionAddFilm,
  actionSearchActor,
  actionStatistics
} from '@store/action/actionTemplates';
import { AdminPanel } from '@components/AdminPanel/adminPanel';
import { collections, ROOT } from '@utils/config';
import { AddFilm } from '@components/AddFilm/addFilm';
import { inputButton } from '@components/inputButton/inputButton';
import { buttonSubmit } from '@components/ButtonSubmit/buttonSubmit';
import { ActorCard } from '@components/ActorCard/actorCard';
import {router} from '@router/router';

export interface AdminPage {
  state: {};
}

/**
 * Класс формирование страницы админки
 * @class AdminPage
 * @typedef {AdminPage}
 */
export class AdminPage extends View {
  private popupEvent: (event) => void;
  private changeEvent: (event) => void;

  /**
   * Конструктор класса
   * @param ROOT
   */
  constructor (ROOT) {
    super(ROOT);
    this.state = {};
  }

  /**
   * Метод создания страницы
   */
  render () {
    this.renderDefaultPage();
    const footer = document.querySelector('.footer');
    const contentBlock = document.querySelector('.content-block');
    footer?.remove();
    contentBlock!.innerHTML = '';
    const stat = new Statistics();
    const addFilm = new AddFilm(ROOT);
    const adminPanel = new AdminPanel(ROOT);
    contentBlock?.insertAdjacentHTML('beforebegin', adminPanel.render());
    contentBlock?.insertAdjacentHTML('afterbegin', stat.render());
    contentBlock?.insertAdjacentHTML('afterbegin', addFilm.render());
    store.dispatch(actionStatistics()).then(() => {
      const csat = document.querySelector('.statistic-chart');
      const filmPage = document.querySelector('.add-film');
      csat?.classList.add('noactive');
      filmPage?.classList.add('noactive');
      this.addFilmForm();
      this.componentDidMount();
    });
  }

  componentDidMount () {
    const adminPanel = document.querySelector('.admin-panel');
    const addFilm = document.querySelector('.add-film');
    const installPoster = document.querySelector('.add-film__left__poster');
    this.popupEvent = (event) => {
      switch (true) {
        case event.target.closest('.center-text') !== null:
          const last = document.querySelector('.center-text.active');
          last?.classList.remove('active');
          event.target.classList.add('active');
          break;
        default:
          break;
      }

      const button = adminPanel?.querySelector('.active') as HTMLElement;
      const csat = document.querySelector('.statistic-chart');
      const addFilm = document.querySelector('.add-film');
      switch (true) {
        case event.target.closest('.actor-selection_actor') !== null:
          const selected = document.querySelector('.selected-actors');
          const allActors = document.querySelector('.results-actors');
          const watchlist = event.target.closest('.actor-selection_actor')?.querySelector('.image-watchlist');
          const remove = event.target.closest('.actor-selection_actor')?.querySelector('.image-cancel');

          if (event.target.closest('.image-watchlist') !== null) {
            watchlist?.classList?.add('noactive');
            remove?.classList?.remove('noactive');
            selected?.appendChild(event.target.closest('.actor-selection_actor'));

            // @ts-ignore
            event.target.closest('.actor-selection_actor')?.querySelector('.actor-selection_actor_name').style.color = 'black';
          } else {
            watchlist?.classList?.remove('noactive');
            remove?.classList?.add('noactive');
            allActors?.appendChild(event.target.closest('.actor-selection_actor'));
            // @ts-ignore
            event.target.closest('.actor-selection_actor')?.querySelector('.actor-selection_actor_name').style.color = 'white';
          }
          break;
        case event.target.closest('.actors-find') !== null:
          event.preventDefault();
          this.getFormActors();
          break;
        case event.target.closest('.button-submit') !== null:
          event.preventDefault();
          this.getForm();
          break;
        case event.target.closest('.title-type-admin') !== null:
          if (!event.target.closest('.title-type-admin.active')) {
            event.target.classList.add('active');
          } else {
            event.target.classList.remove('active');
          }
          break;
        case button.closest('.admin-panel__csat') !== null:
          csat?.classList.remove('noactive');
          addFilm?.classList.add('noactive');
          break;
        case button.closest('.admin-panel__add-film') !== null:
          csat?.classList.add('noactive');
          addFilm?.classList.remove('noactive');
          break;
        default:
          break;
      }
    };

    this.changeEvent = (event) => {
      switch (true) {
        case event.target.closest('.settings_file') !== null:
          const file = document.querySelector('.settings_file') as HTMLInputElement;
          const image = document.querySelector('.settings__img') as HTMLImageElement;
          // @ts-ignore
          if (file?.files?.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
              if (e.target && e.target.result) {
                image.src = `${e.target.result}`;
              }
            };// @ts-ignore
            reader.readAsDataURL(file.files[0]);
          }
          break;
        default:
          break;
      }
    }

    installPoster?.addEventListener('change', this.changeEvent);
    adminPanel?.addEventListener('click', this.popupEvent);
    addFilm?.addEventListener('click', this.popupEvent);

    const result = store.getState('getStatistics');
    if (result?.status !== 200) {
      return;
    }

    const div1 = document.querySelector('div[data-section="1"]') as HTMLElement;
    const div2 = document.querySelector('div[data-section="2"]') as HTMLElement;
    const div3 = document.querySelector('div[data-section="3"]') as HTMLElement;
    const div4 = document.querySelector('div[data-section="4"]') as HTMLElement;
    const div5 = document.querySelector('div[data-section="5"]') as HTMLElement;
    const div6 = document.querySelector('div[data-section="6"]') as HTMLElement;
    const div7 = document.querySelector('div[data-section="7"]') as HTMLElement;
    const div8 = document.querySelector('div[data-section="8"]') as HTMLElement;
    const div9 = document.querySelector('div[data-section="9"]') as HTMLElement;
    const div10 = document.querySelector(
      'div[data-section="10"]'
    ) as HTMLElement;

    // Заданное значение number
    // Get an array of all the div elements
    const divElements = [
      div1,
      div2,
      div3,
      div4,
      div5,
      div6,
      div7,
      div8,
      div9,
      div10
    ];

    // Iterate through the div elements and assign the count values
    divElements.forEach((div, index) => {
      const count = index + 1; // Calculate the count value based on the index
      const targetObject = result.body.statistics.find(
        (obj) => obj.number === count
      );
      const targetCount = targetObject ? targetObject.count : null;
      div?.style.setProperty('--val', `${targetCount}`);
      // @ts-ignore
      div?.querySelector('.value')?.textContent = `${targetCount}`;
    });
  }

  addFilmForm () {
    const settings = document.querySelector('.change-user-data') as HTMLElement;
    const title = document.querySelector('.title-text');
    const date = document.querySelector('.date-text');
    const button = document.querySelector('.add-film__left');
    const genre = document.querySelector('.section-title-type');
    // @ts-ignore
    settings?.style.width = '100%';

    const collectionGenreItems = collections.collection_items;
    for (let i = 0; i < collectionGenreItems.length; i++) {
      const item = collectionGenreItems[i];
      genre?.insertAdjacentHTML(
        'beforeend',
        `<div class="title-type-admin" data-section="${item.value}">${item.key}</div>`
      );
    }

    title!.insertAdjacentHTML(
      'beforeend',
      inputButton.render({ wrap: 'title', module: 'add-film' })
    );

    date!.insertAdjacentHTML(
      'beforeend',
      inputButton.render({
        wrap: 'date',
        module: 'add-film',
        type: 'date'
      })
    );

    button?.insertAdjacentHTML(
      'beforeend',
      buttonSubmit.render({ text: 'Сохранить' })
    );

    const name = document.querySelector('.actors-text-add') as HTMLElement;
    name?.insertAdjacentHTML(
      'beforeend',
      inputButton.render({ wrap: 'name', module: 'select' })
    );
  }

  getForm () {
    const titleHTML = document.querySelector('.title-input-add-film') as HTMLInputElement;
    const infoHTML = document.querySelector('.review-form__body__text') as HTMLInputElement;
    const dateHTML = document.querySelector('.date-input-add-film') as HTMLInputElement;
    const fileInputHTML = document.querySelector('.settings_file') as HTMLInputElement;

    const genres = document.querySelectorAll('.title-type-admin.active');
    // @ts-ignore
    const actors = document.querySelector('.selected-actors').querySelectorAll('.actor-selection_actor');

    const sectionDataArray = Array.from(genres).map((div) =>
      parseInt(<string>div.getAttribute('data-section'))
    );
    const sectionActorsArray = Array.from(actors).map((div) =>
      parseInt(<string>div.getAttribute('data-section'))
    );

    const title = titleHTML?.value.trim();
    const info = infoHTML.value;
    const date = dateHTML.value;
    const file = fileInputHTML?.files ? fileInputHTML.files[0] : null;
    const data = new FormData();

    data.append('title', title);
    data.append('info', info);
    data.append('date', date);
    data.append('genre', sectionDataArray.join(','));
    if (file) {
      data.append('photo', file);
    }

    store.dispatch(actionAddFilm({ file: data })).then(response => {
      this.componentWillUnmount();
      router.refresh();
    });
  }

  getFormActors () {
    const nameActor = (document.querySelector('.name-input-select') as HTMLInputElement).value.trim();
    const allActors = document.querySelector('.results-actors') as HTMLElement;
    allActors!.innerHTML = '';

    store.subscribe('resultSearchActor', this.resultFindActors.bind(this));
    store.dispatch(
        actionSearchActor({
          name: nameActor,
          amplua: [''],
          county: '',
          birthday: '',
          films: ['']
        })
    );
  }

  componentWillUnmount () {
    const adminPanel = document.querySelector('.admin-panel');
    const addFilm = document.querySelector('.add-film');
    const installPoster = document.querySelector('.settings__img');
    const body = document.querySelector('.results-actors');
    body!.innerHTML = '';

    installPoster?.removeEventListener('change', this.changeEvent);
    adminPanel?.removeEventListener('click', this.popupEvent);
    addFilm?.removeEventListener('click', this.popupEvent);
  }

  resultFindActors () {
    const response = store.getState('resultSearchActor');
    store.unsubscribe('resultSearchActor', this.resultFindActors.bind(this));
    const body = document.querySelector('.results-actors');

    if (response?.status === 200) {
      // eslint-disable-next-line guard-for-in
      for (const actor in response?.body.actors) {
        const actorCard = new ActorCard(ROOT);
        body?.insertAdjacentHTML(
          'beforeend',
          actorCard.render({ actor: response?.body.actors[actor], alreadyFavorite: false, addClass: 'actor', addClassPoster: 'actor-poster' })
        );
      }
    }
  }
}
