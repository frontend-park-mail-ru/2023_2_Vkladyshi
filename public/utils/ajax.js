import { methods } from './config.js';

/**
 * get запрос
 * @param params параметры запроса
 * @return {Promise} Promise ответ
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
 * post запрос
 * @param root0
 * @param root0.url
 * @param root0.body
 * @return {Promise} Promise ответ
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
