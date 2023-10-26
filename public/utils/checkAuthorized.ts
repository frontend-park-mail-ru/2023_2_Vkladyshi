import { responseStatuses, urls } from '@utils/config';
import { get } from '@utils/ajax';

/**
 * проверка на авторизацию
 * @return {Promise} результат проверки
 */
export async function checkAuthorized() {
  return await get({
    url: urls.authorized,
  }).then((response) => {
    return response["status"] === responseStatuses.success;
  });
}
