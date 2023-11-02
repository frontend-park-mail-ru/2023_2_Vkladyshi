import { post, get } from '@utils/ajax';
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
}

export const actionsUser = new ActionsUser();
