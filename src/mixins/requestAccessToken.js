import { apiDomain, clientId, clientSecret } from '@/api/env';
const FormData = require('form-data');
const data = new FormData();
data.append('grant_type', 'client_credentials');
data.append('client_id', clientId);
data.append('client_secret', clientSecret);
data.append('scope', 'read write');

export default {
  methods: {
    requestAccessToken() {
      this.$ibenta.post(`${apiDomain}/oauth/token`, data)
          .then(response => {
            window.localStorage.setItem('accessToken', JSON.stringify(response.data.access_token));
          });
    }
  }
}
