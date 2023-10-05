import { methods } from './config.js';

/**
 * Выполняет GET-запрос по указанному URL с опциональными параметрами запроса.
 * @async
 * @function get
 * @param {object} params - Параметры запроса.
 * @param {string} params.url - URL, по которому будет выполнен GET-запрос.
 * @param {object} [params.query] - Объект с параметрами запроса, которые будут добавлены к URL в виде строки запроса.
 * @returns {Promise<Response>} Промис, который разрешается объектом Response, содержащим данные ответа на запрос.
 */
export async function get(params = {}) {
  const response = await fetch(
    params.url + '?' + new URLSearchParams(params.query || {}),
    {
      method: methods.get,
      credentials: 'include',
      mode: 'cors',
    }
  );
  response.data = await response.json();
  return response;
}

/**
 * Выполняет POST-запрос по указанному URL с указанным телом запроса.
 * @async
 * @function post
 * @param {object} params - Параметры запроса.
 * @param {string} params.url - URL, по которому будет выполнен POST-запрос.
 * @param {object} params.body - Тело запроса в формате JSON.
 * @returns {Promise<Response>} Промис, который разрешается объектом Response, содержащим данные ответа на запрос.
 */
export async function post({ url, body }) {
  const response = await fetch(url, {
    method: methods.post,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });
  response.data = await response.json();
  return response;
}
