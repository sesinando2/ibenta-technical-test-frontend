import { clientData } from '@/api/env';

export default {
  methods: {
    requestAccessToken() {
      this.$ibenta.post('/oauth/token', clientData)
          .then(response => {
            window.localStorage.setItem('accessToken', JSON.stringify(response.data.access_token))
          })
    }
  }
}
