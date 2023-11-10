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
 * @param root0.contentType
 * @returns {Promise} Promise ответ
 */
export async function post ({ url, body, contentType = false }) {
  let data;
  const header = { 'x-csrf-token': <string>localStorage.getItem('csrf') };

  if (contentType) {
    data = body.file;
  } else {
    data = JSON.stringify(body);
    header['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, {
    method: methods.post,
    credentials: 'include',
    mode: 'cors',
    headers: header,
    body: data
  });
  let result = await response.text();

  try {
    result = JSON.parse(result);
    return result;
  } catch (error) {
    console.error(`Error: ${methods.post} ${url}`);
    return { status: 400 };
  }
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
      localStorage.setItem(
        'csrf',
        <string>response.headers.get('x-csrf-token')
      );
    }

    return JSON.parse(result);
  } catch (error) {
    console.error(params['url'] + ' error');
  }
}
