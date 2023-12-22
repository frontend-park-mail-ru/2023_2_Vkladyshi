import { Component } from '@components/component';
import * as templateActorCard from '@components/ActorCard/actorCard.hbs';

/**
 * Класс рендеринга карточки актера
 * @class ActorCard
 * @typedef {ActorCard}
 */
export class ActorCard extends Component {
  con;
  /**
   * Метод рендеринга элемента
   * @returns {string}
   * @param actor.actor
   * @param actor.alreadyFavorite
   * @param actor.addClass
   * @param actor.addClassPoster
   * @param actor
   */

  render ({ actor, alreadyFavorite, addClass = '', addClassPoster = '', adminPanel = false }) {
    const result = {
      id: actor.actor_id,
      title: actor.actor_name,
      poster: actor.actor_photo,
      alreadyFavorite: alreadyFavorite,
      adminPanel: adminPanel,
      addClass: addClass,
      addClassPoster: addClassPoster
    };

    return templateActorCard(result);
  }
}
