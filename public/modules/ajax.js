import { methods, response_statuses  } from "./config.js"
export class Ajax {
    async get(params = {}) {
        const response = await fetch(params.url, {
            method: methods.get,
            credentials: 'include',
        })
        if (response.status === response_statuses.invalid_error) {
            throw new Error(`Request failed with status 400`);
        }
        return {
            status: response.status,
            response,
        }
    }

    async post({ url, body }) {
        const response = await fetch(url, {
            method: methods.post,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }
        return response;

    }
}
