<template>
  <div class="row">
    <div class="col-10 mx-auto">
      <template v-if="isLoading">
        <!-- TODO Add actual skeleton loader -->
        <div class="text-center">
          <data-processing-icon width="100%"></data-processing-icon>
          <h1 v-text="'Loading Data...'"></h1>
        </div>
        <!-- TODO Add actual skeleton loader -->
      </template>
      <template v-else>
        <users-list-table></users-list-table>
      </template>
    </div>
  </div>
</template>

<script>
import UsersListTable from '@/components/Users/UsersListTable'
import DataProcessingIcon from '@/components/Icons/DataProcessingIcon'

export default {
  components: {
    UsersListTable,
    DataProcessingIcon,
  },

  data: () => ({
    isLoading: true,
  }),

  methods: {
    // Note: To be replaced by an actual login feature.
    async mimicUserLogin() {
      const { data } = await this.$axios.post('/oauth/token', require('qs').stringify({
        client_id: 'AITWD1zyBVuPWgn4ZBHSREtXJDZXL9Lt',
        client_secret: 'ELEGpyarKD0OWDrzfiqWqmpkOb4FSKnb',
        grant_type: 'client_credentials',
      }), { headers: {'content-type': 'application/x-www-form-urlencoded;charset=utf-8'} })

      this.$axios.interceptors.request.use((requestConfig) => {
        requestConfig.headers.Authorization = `Bearer ${data.access_token}`
        return requestConfig
      }, (requestError) => Promise.reject(requestError))

      this.isLoading = false
    },
  },

  async mounted() {
    await this.mimicUserLogin()
  }
}
</script>
