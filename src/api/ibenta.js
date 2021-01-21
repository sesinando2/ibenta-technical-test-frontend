import { apiDomain } from './env';

const accessToken = JSON.parse(window.localStorage.getItem('accessToken'))

const headers = {
  'Accept': 'application/json',
  'Authorization': `Bearer ${accessToken}`
}

const axios = require('axios');

const ibenta = axios.create({
  baseURL: apiDomain,
  headers: headers
});

export default ibenta;
