<template>
<div class="card mb-5">

    <div class="card-header">
      <h5>{{ formTitleHeader }}</h5>
    </div>
    <div class="card-body">
      <form @submit.prevent="formAction">
        <div class="form-group mb-2">
          <label for="username" class="form-label">Username</label>
          <input type="text" v-model="form.name" class="form-control" placeholder="Username" required>
        </div>

        <div class="form-group mb-2">
          <label for="email" class="form-label">Email</label>
          <input type="email" v-model="form.email" class="form-control" placeholder="Email" required>
        </div>

        <div class="form-group mb-2">
          <label for="firstname" class="form-label">First Name</label>
          <input type="text" v-model="form.firstName" class="form-control" placeholder="First Name" required>
        </div>

        <div class="form-group mb-2">
          <label for="lastname" class="form-label">Last Name</label>
          <input type="text" v-model="form.lastName" class="form-control" placeholder="Last Name" required>
        </div>

        <div class="form-group mb-2">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="form.password" class="form-control" placeholder="Password" required>
        </div>

        <button type="submit" class="btn btn-success float-right">{{ buttonText }}</button>
      </form>
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
