import { responseStatuses, urls } from "./config.js";
import { get } from './ajax.js';

export async function checkAuthorized() {
    return await get({
        url: urls.authorized,
    })
      .then((response) => {
          return response.data.status === responseStatuses.success
      })
}
