import { methods, responseStatuses, urls } from './config.js';

/**
 *
 */
export async function checkAuthorized() {
  const response = await fetch(urls.authorized, {
    method: methods.get,
    credentials: 'include',
  });
  return response.status === responseStatuses.success;
}
