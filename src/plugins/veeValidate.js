import Vue from 'vue'
import { setInteractionMode, ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'The {_field_} field is required',
})

extend('email', {
  ...email,
  message: 'The {_field_} field is not valid'
})

// setInteractionMode('eager')

Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
