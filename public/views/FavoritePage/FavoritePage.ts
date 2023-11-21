import { View } from '@views/view';
import { filmSelectionPage, ROOT } from '@utils/config';
import { favoriteFilms } from '@components/FavoriteFilms/favoriteFilms';
import { store } from '@store/store';
import { actionFavoriteFilms } from '@store/action/actionTemplates';
import { FilmCard } from '@components/filmCard/filmCard';
import {router} from "@router/router";
import {DirectoryFilms} from "@components/DirectoryFilms/directoryFilms";
import {modal} from "@components/Modal/modal";
import {removeErrors, removeErrorsActive} from "@utils/addError";
import {inputButton} from "@components/inputButton/inputButton";
import {buttonSubmit} from "@components/ButtonSubmit/buttonSubmit";

export interface FavoritePage {
    state: {
    };
}

export class FavoritePage extends View {
    private popupEvent: (event) => void;
    /**
     * Конструктор для формирования родительского элемента
     * @param ROOT
     * @class
     */
    constructor (ROOT) {
      super(ROOT);
      this.state = {
      };

      store.subscribe('favoriteFilms', this.subscribeFavoriteFilms.bind(this));
    }

    render () {
      this.renderDefaultPage();

      const contentBlockHTML = document.querySelector('.content-block') as HTMLElement;
      contentBlockHTML.style.display='flex';

      contentBlockHTML?.insertAdjacentHTML('beforeend', favoriteFilms.render(false));
      store.dispatch(actionFavoriteFilms({ page: 1, per_page: 10 }));

        const mainHTML = document.querySelector('main');
        mainHTML?.insertAdjacentHTML('afterbegin', modal.render(true));

        const modalHTML = document.querySelector('.modal');
        const bodyHTML = document.querySelector('.modal__window__body');
        const buttonHTML = document.querySelector('.modal__window__button');

        modalHTML?.classList.add('none-active-modal');

        bodyHTML!.insertAdjacentHTML(
            'beforeend',
            inputButton.render({ wrap: 'direction', module: 'modal' })
        );

        buttonHTML!.insertAdjacentHTML(
            'beforeend',
            buttonSubmit.render({ text: 'Создать' })
        );
    }

    componentDidMount () {
        const dragstart = (event) => {
            event.dataTransfer.setData('dragItem', event.target.dataset.section);
            // console.log('dragstart')
        }

        const movalEvent = (event) => {
            switch (true) {
                case event.target.closest('.modal__window') === null:
                    modal.displayNone();
                    break;
                case event.target.closest('.button-submit') !== null:
                    const inputText = document.querySelector('.direction-input-modal') as HTMLInputElement;
                    const contentBlockHTML = document.querySelector('.favorite-films__header') as HTMLInputElement;
                    // console.log(inputText.value.trim());
                    modal.displayNone();

                    const directory = new DirectoryFilms(ROOT);
                    const buf = document.createElement('div') as HTMLElement;
                    buf.innerHTML = directory.render({directionName: inputText.value.trim()});

                    const dir = buf.querySelector('.directory-films') as HTMLElement;
                    dir.addEventListener('dragenter', dragenter);
                    dir.addEventListener('dragleave', dragleave);
                    dir.addEventListener('dragover', dragover);
                    dir.addEventListener('drop', drop.bind(dir));

                    contentBlockHTML.insertAdjacentElement('afterend', dir);

                    break;
                default:
                    break;
            }
        };

        const dragenter = (event) => {
            event.preventDefault()
            const target = event.target;
            target.style.opacity = 0.7;
        }

        const dragleave = (event) => {
            const target = event.target;
            target.style.opacity = 1;
        }

        const dragover = (event) => {
            event.preventDefault();
        }

        const drop = (event) => {
           const flag = event.dataTransfer.getData('dragItem');
           const element = document.querySelector(`[data-section="${flag}"]`);
            element?.remove();
        }

        const elements = document.querySelectorAll('.film-selection_film');
        const dirs = document.querySelectorAll('.directory-films');

        elements.forEach(item => {
            item.addEventListener('dragstart', dragstart.bind(item));
        })

        dirs.forEach(dir => {
            dir.addEventListener('dragenter', dragenter);
            dir.addEventListener('dragleave', dragleave);
            dir.addEventListener('dragover', dragover);
            dir.addEventListener('drop', drop.bind(dir));
        })

        const createDir = document.querySelector('.create-direction');
        createDir?.addEventListener('click', (event) => {
            const modalHTML = document.querySelector('.modal');

            modal.displayActive();

            modalHTML?.addEventListener('click', movalEvent);
        });
    }

    componentWillUnmount () {
    }

    subscribeFavoriteFilms () {
        const contentBlockHTML = document.querySelector('.favorite-films') as HTMLElement;
        const films = store.getState('favoriteFilms').body.films;

        for (const film in films) {
            const filmCard = new FilmCard(ROOT);
            contentBlockHTML?.insertAdjacentHTML('beforeend', filmCard.render({ film: films[film], alreadyFavorite: true }));
        }

        this.componentDidMount();
    }
}

export const favoritePage = new FavoritePage(ROOT);
