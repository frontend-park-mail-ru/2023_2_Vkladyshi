
import {methods, urls} from './config.js';

export async function get(params = {}) {
    const response = await fetch(params.url, {
        method: methods.get,
        credentials: 'include',
    })
    return {
        status: response.status,
        response,
    }
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
