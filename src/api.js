'use strict';
import axios from 'axios';

export default function api(method, url, params = null, data = null) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const clientId = import.meta.env.VITE_CLIENT_ID;

  return axios({
    method,
    url: `${baseURL}/${url}`,
    params,
    data,
    headers: {
      'Content-Type': 'application/json',
      'client-id': clientId,
    },
  });
}
