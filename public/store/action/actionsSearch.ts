import { get, post } from '@utils/ajax';
import { urls } from '@utils/config';
import { page404 } from '@router/Page404/page404';

class ActionsSearch {
  async searchFilm({
    title,
    dateFrom,
    dateTo,
    ratingFrom,
    ratingTo,
    mpaa,
    genre,
    actors,
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
        actors: actors || [],
      },
    });

    const result = await response;

    if (result === undefined || result['status'] !== 200) {
      console.log(404);
      page404.render();
    }

    return {
      resultSearchFilm: result,
    };
  }

  async searchActor({ name, films, birthday, amplua }: searchActor) {
    const response = post({
      url: urls.searchActor,
      body: { name: name, films: films, birthday: birthday, amplua: amplua },
    });

    const result = await response;

    if (result === undefined || result['status'] !== 200) {
      // console.log(404)
      page404.render();
    }

    return {
      resultSearchActor: result,
    };
  }
}

export const actionsSearch = new ActionsSearch();
