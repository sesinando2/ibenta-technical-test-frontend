<template>
<div class="container">

  <notification
      v-if="notif"
      :success="success"
      :message="message">
  </notification>

  <user-form
      :edit-user="editUserData"
      @add-user="addUser"
      @update-user="updateUser">
  </user-form>

  <table-data
      :users="users"
      @edit-user="editUser"
      @delete-user="deleteUser">
  </table-data>

</div>
</template>

<script>
import UserForm from './UserForm';
import Notification from './Notification';
import TableData from './Table';
import requestAccessToken from '@/mixins/requestAccessToken';

export default {
  components: {
    UserForm,
    Notification,
    TableData
  },

  mixins:[requestAccessToken],

  data() {
    return {
      users:[],
      editUserData:false,
      success:null,
      message:"",
      notif:false,
    }
  },

  created() {
    this.requestAccessToken();
    this.fetchUsers();
  },

  methods: {
    fetchUsers() {
      setTimeout(() => {
        this.$ibenta.get('/api/users')
        .then(response => {
          this.users = response.data.content;
        })
      }, 2000);
    },
    addUser(user) {
      this.users.push(user);
      this.notif = true;
      this.success = true;
      this.message = "User successfully added!";
    },
    editUser(user) {
      this.editUserData = user;
    },
    updateUser(user) {
      this.notif = true;
      this.success = true;
      this.message = "User successfully updated!";
    },
    deleteUser(user) {
      this.$ibenta.delete(`/api/users/${user.id}`)
        .then(response => {
          this.users.splice(this.users.indexOf(user), 1);
          this.notif = true;
          this.success = true;
          this.message = "User successfully deleted!";
        })
    },
  }
}
</script>
