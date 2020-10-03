<template>
  <div>
    <add-user-form @submitted="handleSubmitted"></add-user-form>

    <card title="Users">
      <template v-if="hasNoUsers">
        <div class="text-center py-5">
          <empty-icon></empty-icon>
          <h4 class="text-muted" v-text="'No users found.'"></h4>
        </div>
      </template>
      <paper-table
        v-if="hasUsers"
        with-actions
        :columns="[
          'ID',
          'Name',
          'Email',
        ]"
        :data="users.content"
        >
        <template v-slot:actions="item">
          <!-- Edit Action -->
          <dialog-box :hide-footer="true" title="Edit User" :item="item" submit-text="Update">
            <edit-user-form @submitted="handleUpdated" :item="item"></edit-user-form>
            <template v-slot:activator="{ on }">
              <button
                :ref="`edit-${item.id}-button`"
                v-on="on"
                type="button"
                class="btn btn-just-icon btn-info mx-3"
              >
                <i class="ti ti-pencil"></i>
              </button>
            </template>
          </dialog-box>
          <!-- Edit Action -->

          <!-- Delete Action -->
          <dialog-box
            title="Delete User"
            :message="true"
            text="Are you sure you want to delete the selected user?"
            :item="item"
            submit-text="Delete"
            @confirm="deleteUser"
            >
            <template v-slot:activator="{ on }">
              <button v-on="on" type="button" class="btn btn-just-icon btn-danger">
                <i class="ti ti-close"></i>
              </button>
            </template>
          </dialog-box>
          <!-- Delete Action -->
        </template>
      </paper-table>
    </card>
  </div>
</template>

<script>
import AddUserForm from '@/components/Users/AddUserForm'
import EditUserForm from '@/components/Users/EditUserForm'
import DialogBox from '@/components/Dialog/DialogBox'
import EmptyIcon from '@/components/Icons/EmptyIcon'
import PaperTable from '@/components/PaperTable'
import { BIcon } from 'bootstrap-vue'
import { isEmpty } from 'lodash'

export default {
  components: {
    AddUserForm,
    BIcon,
    DialogBox,
    EditUserForm,
    EmptyIcon,
    PaperTable,
  },

  computed: {
    hasNoUsers() {
      return this.users.empty
    },
    hasUsers() {
      return !this.users.empty
    },
  },

  data: () => ({
    dialog: false,
    users: {
      empty: true,
      content: []
    },
  }),

  methods: {
    async deleteUser(item) {
      const { data } = await this.$axios.delete(`/api/users/${item.id}`)
      this.getUsers()
    },

    handleUpdated(item) {
      this.$refs[`edit-${item.id}-button`].click()
      this.getUsers()
    },

    handleSubmitted(data) {
      this.getUsers()
    },

    async getUsers() {
      const { data } = await this.$axios.get('/api/users')
      this.users = data
    }
  },

  async mounted() {
    await this.getUsers()
  }
}
</script>
