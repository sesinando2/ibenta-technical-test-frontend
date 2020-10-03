<template>
  <div class="d-inline-block">
    <b-modal :hide-footer="hideFooter" v-model="dialog" class="modal" tabindex="-1" role="dialog">
      <template v-slot:modal-title>
        <h4 v-text="title"></h4>
      </template>

      <div class="d-block text-center">
        <p v-if="message" v-text="text"></p>
        <slot></slot>
      </div>

      <div slot="modal-footer">
        <button
          @click="emitConfirm"
          class="ml-3 btn btn-danger"
          type="button"
          v-text="submitText"
        ></button>
        <button
          @click="emitClose"
          class="ml-3 btn btn-secondary"
          data-dismiss="modal"
          type="button"
          v-text="'Cancel'"
        ></button>
      </div>
    </b-modal>

    <slot name="activator" v-bind:on="{ click: toggleDialog }"></slot>
  </div>
</template>

<script>
import { BModal } from 'bootstrap-vue'

export default {
  props: {
    title: String,
    message: {
      type: Boolean,
      default: false
    },
    text: String,
    submitText: {
      type: String,
      default: 'Submit'
    },
    item: Object,
    hideFooter: {
      type: Boolean,
      default: false
    }
  },

  components: {
    BModal,
  },

  data: () => ({
    dialog: false,
  }),

  methods: {
    emitClose() {
      this.dialog = false
      this.$emit('close', this.item)
    },

    emitConfirm() {
      this.dialog = false
      this.$emit('confirm', this.item)
    },

    toggleDialog() {
      this.dialog = !this.dialog
    }
  }
}
</script>

<style>
.modal-backdrop {
  background-color: rgba(0,0,0,0.2) !important;
}
</style>
