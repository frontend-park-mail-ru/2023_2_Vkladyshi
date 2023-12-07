import { get, post } from '@utils/ajax';
import { urls } from '@utils/config';
import { page404 } from '@router/Page404/page404';

class ActionsSearch {
  async searchFilm ({
    title,
    dateFrom,
    dateTo,
    ratingFrom,
    ratingTo,
    mpaa,
    genre,
    actors
  }: searchFilm) {
    const response = post({
      url: urls.searchFilm,
      body: {
        title: title || '',
        date_from: dateFrom || '',
        date_to: dateTo || '',
        rating_from: ratingFrom || 0,
        rating_to: ratingTo || 10,
        mpaa: mpaa || '',
        genres: genre || [],
        actors: actors || []
        // page: page,
        // per_page: per_page
      }
    });

    const result = await response;

    if (result === undefined) {
      console.error(404);
      page404.render();
    }

    return {
      resultSearchFilm: result
    };
  }

  async searchActor ({ name, films, birthday, amplua }: searchActor) {
    const response = get({
      url: urls.searchActor,
      body: { name: name, films: films, birthday: birthday, amplua: amplua
        // page: page, per_page: per_page
      }
    });

    const result = await response;

    if (result === undefined) {
      console.error(404);
      page404.render();
    }

    return {
      resultSearchActor: result
    };
  }
}

export const actionsSearch = new ActionsSearch();
