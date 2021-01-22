<template>
<div class="card mb-5">

    <div class="card-header">
      <h5>{{ formTitleHeader }}</h5>
    </div>
    <div class="card-body">
      <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="formAction">
        <div class="row mb-3">
          <h5 class="col-12">
            Full Name
          </h5>
          <div class="form-group mb-2 col">
            <ValidationProvider name="First Name" rules="required|alpha" v-slot="{ errors }">
              <label for="firstname" class="form-label">First Name</label>
              <input type="text" v-model="form.firstName" class="form-control" placeholder="First Name" required>
              <small id="emailHelp" class="form-text text-muted">Maximum of 255 characters.</small>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group mb-2 col">
            <ValidationProvider name="Last Name" rules="required|alpha" v-slot="{ errors }">
              <label for="lastname" class="form-label">Last Name</label>
              <input type="text" v-model="form.lastName" class="form-control" placeholder="Last Name" required>
              <small id="emailHelp" class="form-text text-muted">Maximum of 255 characters.</small>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>

        <div>
          <h5>User Credentials</h5>

          <div class="form-group mb-2">
            <ValidationProvider name="Username" rules="required|alpha" v-slot="{ errors }">
              <label for="username" class="form-label">Username</label>
              <input type="text" v-model="form.name" class="form-control" placeholder="Username" required>
              <small id="emailHelp" class="form-text text-muted">Your username must be unique.</small>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group mb-2">
            <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
              <label for="email" class="form-label">Email</label>
              <input type="email" v-model="form.email" class="form-control" placeholder="Email" required>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <div class="form-group mb-2">
            <ValidationProvider name="Password" rules="required|alpha" v-slot="{ errors }">
              <label for="password" class="form-label">Password</label>
              <input type="password" v-model="form.password" class="form-control" placeholder="Password" required>
              <small id="emailHelp" class="form-text text-muted">Password must be atleast 8 characters.</small>
              <span class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
        </div>

        <button type="submit" class="btn btn-success float-right" :disabled="invalid">{{ buttonText }}</button>
      </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  props:['editUser'],

  data() {
    return {
      form: {
        name:"",
        firstName:"",
        lastName:"",
        email:"",
        password:"",
      },
    }
  },

  watch: {
    editUser() {
      if(this.editUser) {
        this.form = this.editUser;
      }
    }
  },

  computed: {
    buttonText() {
      return (this.editUser) ? 'Update User' : 'Save User';
    },
    formAction() {
      return (this.editUser) ? this.updateUser : this.saveUser;
    },
    formTitleHeader() {
      return (this.editUser) ? 'Update User' : 'Add New User';
    }
  },

  methods: {
    saveUser() {
      this.$ibenta.post('/api/users', this.form)
        .then(response => {
          this.$emit('add-user', response.data);
          this.clearForm();
        })
    },
    updateUser() {
      this.$ibenta.put(`/api/users/${this.form.id}`, this.form)
        .then(response => {
          this.$emit('update-user', this.form);
        })
    },
    clearForm() {
      this.form.name = "";
      this.form.lastName = "";
      this.form.firstName = "";
      this.form.email = "";
      this.form.password = "";
    }
  }
}
</script>
