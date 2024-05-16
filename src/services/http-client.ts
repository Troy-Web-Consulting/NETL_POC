import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://your-api-base-url', // TODO: Replace
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar' // TODO: Replace
  }
});

export default instance;