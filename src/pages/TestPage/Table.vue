<template>
<div class="card">
  <div class="card-header">
    <h5>Users List</h5>
  </div>
  <div class="card-body">
    <table class="table">
      <thead>
        <tr>
          <th>Username</th>
          <th>E-Mail</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="users.length > 0">
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>
              <button class="btn btn-primary btn-sm" @click="editUser(user)">Edit</button>
            </td>
            <td>
              <button class="btn btn-danger btn-sm" @click="deleteUser(user)">Delete</button>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="6" class="text-center">You must add user first</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  props:['users'],

  methods: {
    editUser(user) {
      this.$emit('edit-user', user);
    },
    deleteUser(user) {
      this.$emit('delete-user', user);
    }
  }
}
</script>
