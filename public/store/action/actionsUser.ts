import { post, get, getCsrf } from '@utils/ajax';
import { urls } from '@utils/config';

class ActionsUser {
  async signin (user) {
    const response = post({
      url: urls.signin,
      body: { login: user['login'], password: user['password'] }
    });

    const result = await response;

    return {
      statusLogin: result['status']
    };
  }

  async signup (user) {
    const response = post({
      url: urls.signup,
      body: {
        login: user['login'],
        password: user['password'],
        email: user['email']
      }
    });

    const result = await response;
    return {
      statusSignup: result['status']
    };
  }

  async auth (isAuth = false) {
    if (isAuth) {
      return { statusAuth: 200 };
    }

    const response = get({
      url: urls.authorized
    });
    const result = await response;

    return { statusAuth: result['status'] };
  }

  async logout () {
    const response = get({
      url: urls.logout
    });
    const result = await response;
    return { logoutStatus: result['status'] };
  }

  async getSettings () {
    const response = get({
      url: urls.settings
    });

    const result = await response;
    return {
      getSettingsStatus: result
    };
  }

  async getCsrf () {
    const response = getCsrf({
      url: urls.csrf
    });

    const result = await response;
    return {
      csrf: result
    };
  }

  async updateSettings (putSettings) {
    const response = post({
      url: urls.settings,
      body: putSettings.file,
      contentType: true
    });

    const result = await response;
    return {
      postStatusSettings: result['status']
    };
  }

  // eslint-disable-next-line camelcase
  async userComments ({ page, per_page }: paginator) {
    const response = get({
      url: urls.comments,
      // eslint-disable-next-line camelcase
      query: { page: page, per_page: per_page }
    });

    const result = await response;
    return {
      userCommentsStatus: result
    };
  }

  async removeView () {
    return {
      removeView: true
    };
  }

}

export const actionsUser = new ActionsUser();
