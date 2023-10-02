
import {methods} from "./config.js";

export async function get(params = {}) {
    const response = await fetch(params.url, {
        method: methods.get,
        credentials: 'include',
    })
    return {
        status: response.status,
        response,
    }
    return response;
  }
}

export async function post({ url, body }) {
    const response = await fetch(url, {
        method: methods.post,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
    })
    response.data = await response.json();
    return response;

}