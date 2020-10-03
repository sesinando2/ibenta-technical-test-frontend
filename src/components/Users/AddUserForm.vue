<template>
  <card title="Add User">
    <div>
      <!-- TODO Add Alert if user successfully submitted -->
      <!-- TODO Add Alert if user successfully submitted -->

      <b-alert v-if="errors.length" show variant="danger">
        <p class="alert-heading my-3 alert-link" v-text="'Following errors occured'"></p>
        <ul class="mb-4">
          <li v-for="(e, i) in errors">
            <label
              role="button"
              :for="`input-${e.field}`"
              v-text="`${e.field}: ${e.message}`"
              class="mb-0 alert-link pointer"
            ></label>
          </li>
        </ul>
      </b-alert>

      <validation-observer ref="form:users/create" v-slot="{ handleSubmit, invalid, passed }">
        <form
          ref="adduserform"
          v-on:submit.prevent="handleSubmit(submit($event))"
          novalidate
          autocomplete="false"
          :class="{
            'is-valid': passed,
            'is-invalid': invalid
          }"
          >
          <div class="row">
            <div class="col">
              <validation-provider vid="firstname" name="first name" rules="required" v-slot="{ errors }">
                <fg-input
                  :errors="errors"
                  label="First Name"
                  name="firstName"
                  placeholder="First name"
                  type="text"
                  v-model="user.firstName"
                ></fg-input>
              </validation-provider>
            </div>
            <div class="col">
              <validation-provider vid="lastname" name="last name" rules="required" v-slot="{ errors }">
                <fg-input
                  :errors="errors"
                  label="Last Name"
                  name="lastName"
                  placeholder="Last name"
                  type="text"
                  v-model="user.lastName"
                ></fg-input>
              </validation-provider>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <validation-provider vid="email" name="email" rules="required|email" v-slot="{ errors }">
                <fg-input
                  :errors="errors"
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Email"
                  v-model="user.email">
                </fg-input>
              </validation-provider>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <validation-provider vid="name" name="name" rules="required" v-slot="{ errors }">
                <fg-input
                  :errors="errors"
                  type="text"
                  label="Username"
                  name="name"
                  placeholder="Username"
                  v-model="user.name"
                ></fg-input>
              </validation-provider>
            </div>
            <div class="col-md-6">
              <validation-provider vid="password" name="password" rules="required" v-slot="{ errors }">
                <fg-input
                  :errors="errors"
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                  v-model="user.password">
                </fg-input>
              </validation-provider>
            </div>
          </div>

          <div class="text-right">
            <button type="submit" class="btn btn-large btn-primary" v-text="'Save'"></button>
          </div>
        </form>
      </validation-observer>
    </div>
  </card>
</template>

<script>
import User from '@/models/User'
import { BAlert } from 'bootstrap-vue'

export default {
  components: {
    BAlert,
  },

  computed: {
    form () {
      return this.$refs['form:users/create']
    },
  },

  data: () => ({
    user: new User,
    errors: [],
  }),

  methods: {
    async submit(e) {
      e.preventDefault()

      const isValid = await this.form.validate();

      if (isValid) {
        this.$axios.post('api/users', this.user).then(response => {
          this.$emit('submitted', response.data)
          this.reset()
        }).catch(err => {
          this.errors = err.response.data.violations || []
          this.form.setErrors(err.response.data.violations || [])
        })
      }
    },

    reset() {
      this.errors = []
      this.$nextTick(() => {
        this.form.reset()
        this.user = new User
      });
    },
  },
}
</script>
