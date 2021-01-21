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
import requestAccessToken from '@/mixins/requestAccessToken';
import UserForm from './UserForm';
import Notification from './Notification';
import TableData from './Table';

export default {
  mixins:[requestAccessToken],

  components: {
    UserForm,
    Notification,
    TableData
  },

  data() {
    return {
      users:[],
      editUserData:false,
      success:null,
      message:"",
      notif:false
    }
  },

  created() {
    this.requestAccessToken();
    this.fetchUsers();
  },

  methods: {
    fetchUsers() {
      this.$ibenta.get('/api/users')
        .then(response => {
          this.users = response.data.content;
        })
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
