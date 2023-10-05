import { get } from './ajax.js';
import { urls } from './config.js';

/**
 *
 * @param header
 */
export function logout(header) {
  get({ url: urls.logout }).then((r) => {});
  header.render(false);
}
