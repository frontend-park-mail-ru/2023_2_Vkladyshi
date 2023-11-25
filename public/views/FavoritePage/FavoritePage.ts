import { View } from '@views/view';
import { filmSelectionPage, ROOT } from '@utils/config';
import { favoriteList } from '@components/FavoriteList/favoriteList';
import { store } from '@store/store';
import {
  actionAddFavoriteFilm,
  actionFavoriteActors,
  actionFavoriteFilms, actionRemoveFavoriteActor,
  actionRemoveFavoriteFilm
} from '@store/action/actionTemplates';
import { FilmCard } from '@components/filmCard/filmCard';
import { router } from '@router/router';
import { ActorCard } from '@components/ActorCard/actorCard';

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
      store.subscribe('favoriteActors', this.subscribeFavoriteActor.bind(this));
    }

    render () {
      this.renderDefaultPage();
      const contentBlockHTML = document.querySelector('.content-block') as HTMLElement;
      contentBlockHTML.style.display='flex';

      // console.log(store.state, 1212);

      if (window.location.pathname === '/watchlist/films') {
        contentBlockHTML?.insertAdjacentHTML('beforeend', favoriteList.render({ title: 'Список фильмов', redirect: 'Любимые акторы' }));
        store.dispatch(actionFavoriteFilms({ page: 1, per_page: 20 }));
        return;
      }

      contentBlockHTML?.insertAdjacentHTML('beforeend', favoriteList.render({ title: 'Список актёров', redirect: 'Любимые фильмы' }));
      store.dispatch(actionFavoriteActors({ page: 1, per_page: 20 }));
    }

    componentDidMount (isFilms = true) {
      const popupEvent = (event) => {
        this.popupEvent = popupEvent;
        const filmId = event.target.closest('.film-selection_film')?.getAttribute('data-section');
        const actorId = event.target.closest('.actor-selection_actor')?.getAttribute('data-section');

        switch (true) {
          case event.target.closest('.image-cancel') !== null:
            let id;

            if (isFilms) {
                id = filmId;
              store.dispatch(actionRemoveFavoriteFilm({ film_id: filmId }));
            } else {
                id = actorId;
              store.dispatch(actionRemoveFavoriteActor({ actor_id: actorId }));
            }

            const element = document.querySelector(`[data-section="${id}"]`);
            element?.remove();
            break;
          case event.target.closest('.film-selection_film') !== null:
            this.componentWillUnmount();
            router.go(
              {
                path: '/film',
                props: `/${filmId}`
              },
              { pushState: true, refresh: false }
            );
            break;
          case event.target.closest('.redirect-to-favorite') !== null:
            this.componentWillUnmount();
            if (isFilms) {
              router.go(
                {
                  path: '/watchlist/actors',
                  props: ``
                },
                { pushState: true, refresh: false }
              );
            } else {
              router.go(
                {
                  path: '/watchlist/films',
                  props: ``
                },
                { pushState: true, refresh: false }
              );
            }
            break;
          case event.target.closest('.actor-selection_actor') !== null:
            this.componentWillUnmount();
            router.go(
              {
                path: '/actor',
                props: `/${actorId}`
              },
              { pushState: true, refresh: false }
            );
            break;
          default:
            break;
        }
      };

      const elements = document.querySelector('.favorite');
      elements?.addEventListener('click', popupEvent.bind(elements));
    }

    componentWillUnmount () {
    }

    subscribeFavoriteFilms () {
      const contentBlockHTML = document.querySelector('.favorite__body') as HTMLElement;
      const films = store.getState('favoriteFilms')?.body.films;

      for (const film in films) {
        const filmCard = new FilmCard(ROOT);
        contentBlockHTML?.insertAdjacentHTML('beforeend', filmCard.render({ film: films[film], alreadyFavorite: true }));
      }

      this.componentDidMount(true);
    }

    subscribeFavoriteActor () {
      const contentBlockHTML = document.querySelector('.favorite__body') as HTMLElement;
      const actors = store.getState('favoriteActors')?.body.actors;
      // console.log(actors);
      for (const actor in actors) {
        const actorCard = new ActorCard(ROOT);
        contentBlockHTML?.insertAdjacentHTML('beforeend', actorCard.render({ actor: actors[actor], alreadyFavorite: true }));
      }

      this.componentDidMount(false);
    }
}

export const favoritePage = new FavoritePage(ROOT);

/*
* <iframe class="mbr-background-video" id="ytplayer-95a211" style="margin-top: 0px; max-width: initial; transition-property: opacity; transition-duration: 1000ms; pointer-events: none; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; transform: scale(1.2);" frameborder="0" allowfullscreen="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="INSIDE OUT 2 – FULL TRAILER (2024) Disney Pixar Studios" width="1872" height="1053" src="https://www.youtube.com/embed/r2ofrRyJRZo?autoplay=1&amp;mute=0&amp;controls=0&amp;enablejsapi=1&amp;allowfullscreen=true&amp;iv_load_policy=3&amp;modestbranding=1&amp;origin=https%3A%2F%2Flab-mobirise-ai.ui-api.com&amp;rel=0&amp;mode=transparent&amp;showinfo=0&amp;html5=1&amp;version=3&amp;playerapiid=iframe_YTP_1624972482514&amp;widget_referrer=https%3A%2F%2Fai.mobirise.com%2F&amp;widgetid=1"></iframe>
*
*
* */
