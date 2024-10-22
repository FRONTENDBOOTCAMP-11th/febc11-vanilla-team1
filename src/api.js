'use strict';
import axios from 'axios';

export default function api(method, url, params = null, data = null) {
  return axios({
    method,
    url: `https://11.fesp.shop/${url}`,
    params,
    data,
    headers: {
      'Content-Type': 'application/json',
      'client-id': 'vanilla01',
    },
  });
}
