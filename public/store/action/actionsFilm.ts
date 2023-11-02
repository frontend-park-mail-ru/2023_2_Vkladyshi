import { get } from '@utils/ajax';
import { urls } from '@utils/config';

class ActionsFilm {
  // eslint-disable-next-line camelcase
  async getCollectionDataMain ({ collection_id }: collectionParams) {
    const response = get({
      url: urls.basket,
      // eslint-disable-next-line camelcase
      query: { collection_id: collection_id }
    });

    const result = await response;
    return {
      collectionMain: result
    };
  }

  // eslint-disable-next-line camelcase
  async getCollectionDataMenu ({ collection_id }: collectionParams) {
    const response = get({
      url: urls.basket,
      // eslint-disable-next-line camelcase
      query: { collection_id: collection_id }
    });

    const result = await response;
    return {
      collectionMenu: result
    };
  }

  async getActor ({ actorName }: actor) {
    const response = get({
      url: urls.actor,
      query: { actorName: actorName }
    });

    const result = await response;
    return {
      actorInfo: result
    };
  }
}

export const actionsFilm = new ActionsFilm();
