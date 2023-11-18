import { get } from '@utils/ajax';
import { urls } from '@utils/config';
import { page404 } from '@router/Page404/page404';

class ActionsFilm {
  async getCollectionDataMain ({ collection_id }: collectionParams) {
    const response = get({
      url: urls.basket,
      query: { collection_id: collection_id }
    });

    const result = await response;
    return {
      collectionMain: result
    };
  }

  async getCollectionDataMenu ({ collection_id }: collectionParams) {
    const response = get({
      url: urls.basket,
      query: { collection_id: collection_id }
    });

    const result = await response;
    //
    // if (result['status'] !== 200) {
    //   page404.render();
    // }

    return {
      collectionMenu: result
    };
  }

  async getActor ({ actorName }: actor) {
    const response = get({
      url: urls.actor,
      query: { actor_id: actorName }
    });

    const result = await response;

    // if (result['status'] !== 200) {
    //   page404.render();
    // }

    return {
      actorInfo: result['body']
    };
  }

  async getFilm ({ filmId }: film) {
    const response = get({
      url: urls.film,
      query: { film_id: filmId }
    });

    const result = await response;

    // if (result['status'] !== 200) {
    //   page404.render();
    // }

    return {
      filmInfo: result['body']
    };
  }
}

export const actionsFilm = new ActionsFilm();
