import {methods} from './config.js';

export async function get(params = {}) {
    const response = await fetch(params.url + '?' + new URLSearchParams(params.query || {}), {
        method: methods.get,
        credentials: 'include',
        mode: "cors",
    })
    response.data = await response.json();
    return response;
  }

export async function post({ url, body }) {
    const response = await fetch(url, {
        method: methods.post,
        credentials: 'include',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
    })
    response.data = await response.json();
    return response;

}
