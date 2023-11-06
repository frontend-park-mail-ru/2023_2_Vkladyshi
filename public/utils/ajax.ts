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

  try {
    const result = await response.text();
    return JSON.parse(result);
  } catch (error) {
    console.error(params['url'] + ' error');
  }
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
      'Content-Type': 'application/json; charset=utf-8',
      'x-csrf-token': <string>localStorage.getItem('csrf')
    },
    body: JSON.stringify(body)
  });
  let result = await response.text();

  result = JSON.parse(result);
  return result;
}

/**
 *
 * @param params
 */
export async function getCsrf (params = {}) {
  const response = await fetch(
    params['url'] + '?' + new URLSearchParams(params['query'] || {}),
    {
      method: methods.get,
      credentials: 'include',
      mode: 'cors',
      headers: {
        'x-csrf-token': <string>localStorage.getItem('csrf')
      }
    }
  );

  try {
    const result = await response.text();
    if (response.headers.get('x-csrf-token') !== null) {
      localStorage.setItem('csrf', <string>response.headers.get('x-csrf-token'));
    }

    return JSON.parse(result);
  } catch (error) {
    console.error(params['url'] + ' error');
  }
}
