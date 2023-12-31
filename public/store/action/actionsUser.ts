/* eslint-disable require-jsdoc */
import { post, get, getCsrf } from '@utils/ajax';
import { urls } from '@utils/config';
import { router } from '@router/router';

class ActionsUser {
  async signin(user) {
    const response = post({
      url: urls.signin,
      body: {
        login: user.login,
        password: user.password,
      },
    });

    const result = await response;

    return {
      login: result,
    };
  }

  async signup(user) {
    const response = post({
      url: urls.signup,
      body: {
        login: user.login,
        password: user.password,
        email: user.email,
        birth_date: user.birthday,
      },
    });

    const result = await response;
    return {
      statusSignup: result['status'],
    };
  }

  async auth() {
    const response = get({
      url: urls.authorized,
    });
    const result = await response;

    return {
      auth: result,
    };
  }

  async logout(redirect = false) {
    const response = get({
      url: urls.logout,
    });
    const result = await response;
    return {
      logoutStatus: result.status,
      redirect: redirect,
    };
  }

  async getSettings() {
    const response = get({
      url: urls.settings,
    });

    const result = await response;
    return {
      getSettingsStatus: result,
    };
  }

  async getCsrf() {
    const response = getCsrf({
      url: urls.csrf,
    });

    const result = await response;
    return {
      csrf: result,
    };
  }

  async updateSettings(putSettings) {
    const response = post({
      url: urls.settings,
      body: putSettings,
      contentType: true,
    });

    const result = await response;
    return {
      postStatusSettings: result,
    };
  }

  // eslint-disable-next-line camelcase
  async userComments({ page, per_page }: paginator) {
    const response = get({
      url: urls.comments,
      query: { page: page, per_page: per_page },
    });

    const result = await response;
    return {
      userCommentsStatus: result,
    };
  }

  async filmComments({ film_id, page, per_page }: paginatorFilm) {
    const response = get({
      url: urls.comments,
      query: { film_id: film_id, page: page, per_page: per_page },
    });

    const result = await response;
    return {
      filmCommentsStatus: result,
    };
  }

  async addComment({ film_id, rating, text }: addComment) {
    const response = post({
      url: urls.addComment,
      body: { film_id: film_id, rating: rating, text: text },
    });

    const result = await response;
    return {
      addCommentStatus: result['status'],
    };
  }

  async addCommentTwo({ film_id, rating, text }: addComment) {
    const response = post({
      url: urls.addCommentTwo,
      body: { film_id: film_id, rating: rating, text: text },
    });

    const result = await response;
    return {
      addCommentTwoStatus: result['status'],
    };
  }

  async favoriteFilms({ page, per_page }: paginator) {
    const response = get({
      url: urls.favoriteFilms,
      query: { page: page, per_page: per_page },
    });

    const result = await response;
    return {
      favoriteFilms: result,
    };
  }

  async favoriteActors({ page, per_page }: paginator) {
    const response = get({
      url: urls.favoriteActors,
      query: { page: page, per_page: per_page },
    });

    const result = await response;
    return {
      favoriteActors: result,
    };
  }

  async removeView() {
    return {
      removeView: true,
    };
  }

  async addFavoriteFilm({ film_id }: favoriteFilm) {
    const response = get({
      url: urls.addFavoriteFilm,
      query: { film_id: film_id },
    });

    const result = await response;
    return {
      addFavoriteFilm: result,
    };
  }

  async addFavoriteActor({ actor_id }: favoriteActor) {
    const response = get({
      url: urls.addFavoriteActor,
      query: { actor_id: actor_id },
    });

    const result = await response;
    return {
      addFavoriteActor: result,
    };
  }

  async removeFavoriteFilm({ film_id }: favoriteFilm) {
    const response = get({
      url: urls.removeFilm,
      query: { film_id: film_id },
    });

    const result = await response;
    return {
      removeFavoriteFilm: result,
    };
  }

  async removeFavoriteActor({ actor_id }: favoriteActor) {
    const response = get({
      url: urls.removeActor,
      query: { actor_id: actor_id },
    });

    const result = await response;
    return {
      removeFavoriteActor: result,
    };
  }

  async getStatisticsCsat() {
    const response = get({
      url: urls.statisticsCsat,
    });
    const result = await response;

    return {
      getStatistics: result,
    };
  }

  async addFilm(newFilm) {
    const response = post({
      url: urls.addFilm,
      body: newFilm,
      contentType: true,
    });

    const result = await response;
    return {
      addFilm: result,
    };
  }

  async updateRole({ login, role }: updateRole) {
    const response = post({
      url: urls.updateRole,
      body: {
        login: login,
        role: role,
      },
    });

    const result = await response;
    return {
      updateRole: result,
    };
  }

  async userStatistic() {
    const response = get({
      url: urls.userStatistic,
    });

    const result = await response;
    return {
      userStatistic: result,
    };
  }

  async alreadyWatched() {
    const response = get({
      url: urls.alreadyWatched,
    });

    const result = await response;
    return {
      alreadyWatched: result,
    };
  }

  async removeComment({
    film_id,
    user_id,
    deleteFromServiceFilms,
  }: removeComment) {
    const response = post({
      url: deleteFromServiceFilms
        ? urls.deleteCommentFromServiceFilms
        : urls.deleteCommentFromServiceComments,
      body: {
        user_id: user_id,
        film_id: film_id,
      },
    });

    const result = await response;
    return {
      removeComment: result,
    };
  }
}

export const actionsUser = new ActionsUser();
