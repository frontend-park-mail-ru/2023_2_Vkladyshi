import { View } from '@views/view';
import { store } from '@store/store';
import { Statistics } from '@components/Statistics/statistics';
import {
  actionAddFilm,
  actionSearchActor,
  actionStatistics
} from '@store/action/actionTemplates';
import { AdminPanel } from '@components/AdminPanel/adminPanel';
import { collections, errorInputs, ROOT } from '@utils/config';
import { AddFilm } from '@components/AddFilm/addFilm';
import { inputButton } from '@components/inputButton/inputButton';
import { buttonSubmit } from '@components/ButtonSubmit/buttonSubmit';
import { ActorCard } from '@components/ActorCard/actorCard';
import { router } from '@router/router';
import { addErrorsActive, defaultVariable, insertText, removeErrors, removeErrorsActive } from '@utils/addError';

export interface AdminPage {
  state: {
    errorsHTML: {};
    wraps: {};
    inputsHTML: {};
    file: any;
    defaultImage: any;
  };
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
    this.state = {
      errorsHTML: {},
      wraps: {},
      inputsHTML: {},
      file: '',
      defaultImage: ''
    };

    // console.log('constructor');
  }

  /**
   * Метод создания страницы
   */
  render () {
    // console.log('render admin');
    this.renderDefaultPage({});
    const contentBlock = document.querySelector('.content-block');
    const footer = document.querySelector('.footer');
    footer?.remove();
    // contentBlock!.innerHTML = '';
    const stat = new Statistics();
    const addFilm = new AddFilm(ROOT);
    const adminPanel = new AdminPanel(ROOT);
    contentBlock?.insertAdjacentHTML('beforebegin', adminPanel.render());
    contentBlock?.insertAdjacentHTML('afterbegin', stat.render());
    contentBlock?.insertAdjacentHTML('afterbegin', addFilm.render());
    store.dispatch(actionStatistics()).then(() => {
      this.addFilmForm();
      this.componentDidMount();
    });
  }

  componentDidMount () {
    const adminPanel = document.querySelector('.admin-panel');
    const addFilm = document.querySelector('.add-film');
    const installPoster = document.querySelector('.add-film__left__poster');
    const actorFind = document.querySelector('.actors-find') as HTMLElement;
    actorFind!.style.marginTop = '20px';
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
          removeErrors(this.state.errorsHTML);
          removeErrorsActive(this.state.wraps);
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
          this.state.defaultImage = image.src;
          // @ts-ignore
          if (file?.files?.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
              if (e.target && e.target.result) {
                image.src = `${e.target.result}`;
              }
            };
            // @ts-ignore
            if (file.files[0]) {
              // @ts-ignore
              this.state.file = file.files[0];
            }
            // @ts-ignore
            reader.readAsDataURL(file.files[0]);
          }
          break;
        default:
          break;
      }
    };

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
    const country = document.querySelector('.country-text');
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

    country!.insertAdjacentHTML(
      'beforeend',
      inputButton.render({ wrap: 'country', module: 'add-film' })
    );

    date!.insertAdjacentHTML(
      'beforeend',
      inputButton.render({
        wrap: 'date',
        module: 'add-film',
        type: 'number'
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

    this.init();
  }

  getForm () {
    const elements = this.state.inputsHTML;
    const genres = document.querySelectorAll('.title-type-admin.active');
    // @ts-ignore
    const actors = document.querySelector('.selected-actors').querySelectorAll('.actor-selection_actor');

    const sectionDataArray = Array.from(genres).map((div) => // @ts-ignore
      parseInt(<string>div.getAttribute('data-section'))
    );
    const sectionActorsArray = Array.from(actors).map((div) => // @ts-ignore
      parseInt(<string>div.getAttribute('data-section'))
    );

    const title = elements['title']?.value.trim();
    const info = elements['textArea'].value;
    const country = elements['country'].value.trim();
    const date = elements['date'].value;
    let file;

    if (elements['file']?.files[0]) {
      file = elements['file']?.files[0];
    } else if (this.state.file !== '') {
      file = this.state.file;
    }

    const data = new FormData();

    data.append('title', title);
    data.append('info', info);
    data.append('date', date);
    data.append('country', country);
    data.append('genre', sectionDataArray.join(','));
    data.append('actors', sectionActorsArray.join(','));
    if (file) {
      data.append('photo', file);
    }

    if (this.validateForm({ title: title, info: info, date: date, country: country, file: file, actors: actors, genre: genres })) {
      store.dispatch(actionAddFilm({ file: data })).then(() => {
        // @ts-ignore
        if (store.getState('addFilm').status === 200) {
          setTimeout(() => {
            ROOT?.insertAdjacentHTML(
              'beforeend',
              '<img class="create-successfully" src="/icons/icon-success.png"/>'
            );
          });
          setTimeout(() => { document.querySelector('.create-successfully')?.remove(); }, 4000);
          const selectedActors = document.querySelector('.selected-actors');
          const allActors = document.querySelector('.results-actors');
          selectedActors!.innerHTML = '';
          allActors!.innerHTML = '';

          genres.forEach(genre => {
            genre.classList.remove('active');
          });
          defaultVariable(this.state.inputsHTML);

          const image = document.querySelector('.settings__img') as HTMLImageElement;
          image.src = '/icons/space6.jpg';
        }
      });
    }
  }

  validateForm (dir) {
    let result = true;
    const elements = this.state.errorsHTML;
    const wraps = this.state.wraps;

    if (dir.title === '') {
      insertText(elements['title'], errorInputs.NotAllElement);
      addErrorsActive(wraps['title']);
      result = false;
    }

    if (dir.info === '') {
      insertText(elements['textArea'], errorInputs.NotAllElement);
      addErrorsActive(wraps['textArea']);
      result = false;
    }

    if (dir.country === '') {
      insertText(elements['country'], errorInputs.NotAllElement);
      addErrorsActive(wraps['country']);
      result = false;
    }

    if (dir.date === '') {
      insertText(elements['date'], errorInputs.NotAllElement);
      addErrorsActive(wraps['date']);
      result = false;
    } else if (Number(dir.date) < 1895 || Number(dir.date) > 2028) {
      insertText(elements['date'], errorInputs.VariableError);
      addErrorsActive(wraps['date']);
      result = false;
    }

    if ((dir.file && (dir.file?.type?.startsWith('image/')))) {
    } else {
      insertText(
        document.querySelector('.error-image'),
        'Ошибка: Загруженный файл не является изображение или файл отсутствует'
      );
      result = false;
    }

    if (dir.genre.length === 0) {
      insertText(elements['genre'], errorInputs.NotAllElement);
      result = false;
    }

    if (dir.actors.length === 0) {
      insertText(elements['actors'], errorInputs.NotAllElement);
      result = false;
    }

    return result;
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

  init () {
    const inputHtml = document.querySelector('.error-login');
    const textAreaHtml = document.querySelector('.error-text-area');
    const countryHtml = document.querySelector('.error-country');
    const dateHtml = document.querySelector('.error-birthday');
    const genreHtml = document.querySelector('.error-genre');
    const actorsHtml = document.querySelector('.error-actors');
    const imageError = document.querySelector('.error-image');

    const wrapLogin = document.querySelector('.title');
    const wrapInfo = document.querySelector('.text-area');
    const wrapCountry = document.querySelector('.country');
    const wrapDate = document.querySelector('.date');

    const titleHTML = document.querySelector('.title-input-add-film') as HTMLInputElement;
    const infoHTML = document.querySelector('.review-form__body__text') as HTMLInputElement;
    const dateHTML = document.querySelector('.date-input-add-film') as HTMLInputElement;
    const fileInputHTML = document.querySelector('.settings_file') as HTMLInputElement;
    const countryHTML = document.querySelector('.country-input-add-film') as HTMLInputElement;

    const genres = document.querySelectorAll('.title-type-admin.active');
    // @ts-ignore
    const actors = document.querySelector('.selected-actors').querySelectorAll('.actor-selection_actor');

    this.state.errorsHTML = {
      title: inputHtml,
      textArea: textAreaHtml,
      country: countryHtml,
      genre: genreHtml,
      date: dateHtml,
      actors: actorsHtml,
      image: imageError
    };

    this.state.wraps = {
      title: wrapLogin,
      textArea: wrapInfo,
      country: wrapCountry,
      date: wrapDate
    };

    this.state.inputsHTML = {
      title: titleHTML,
      textArea: infoHTML,
      country: countryHTML,
      date: dateHTML,
      genre: genres,
      actors: actors,
      image: fileInputHTML
    };
  }
}
