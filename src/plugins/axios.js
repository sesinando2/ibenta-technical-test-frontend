import Vue from 'vue'

const axios = require('axios')

const opt = {
  baseURL: process.env.VUE_APP_BASE_API_URL
}

Vue.prototype.$axios = axios.create(opt)

window.axios = axios
