import { methods } from '@utils/config';

/**
 * get запрос
 * @param params параметры запроса
 * @returns {Promise} Promise ответ
 */
export async function get (params = {}) {
  const response = await fetch(
    params['url'] + '?' + new URLSearchParams(params['query'] || {}),
    {
      method: methods.get,
      credentials: 'include',
      mode: 'cors'
    }
  );
  const result = await response.text();
  return JSON.parse(result);
}

/**
 * post запрос
 * @param root0
 * @param root0.url
 * @param root0.body
 * @return {Promise} Promise ответ
 */
export async function post ({ url, body }) {
  const response = await fetch(url, {
    method: methods.post,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(body)
  });
  let result = await response.text();
  result = JSON.parse(result);
  return result;
}
