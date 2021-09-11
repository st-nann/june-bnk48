<template>
  <v-dialog v-model="modal" max-width="350px" persistent scrollable>
    <Modal
      v-if="JSON.stringify(item) !== '{}'"
      :open="tigger_modal"
      :body="true"
      :hide_action="true"
      :closeModal="doCloseModal"
    >
      <div slot="body">
        <div class="text-xs-right">
          <v-icon class="clickable icon-close" @click="doCloseModal()">
            mdi-close-circle
          </v-icon>
        </div>
        <img
          :src="doGetImage(item.image.name, item.image.token)"
          width="100%"
        />
        <div class="pt-2 text-xs-center font-weight-bold font-thai">
          {{ item.name }}
        </div>
      </div>
    </Modal>
  </v-dialog>
</template>

<script>
import Modal from '@/components/base/Modal'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  props: ['modal', 'item'],
  data() {
    return {
      tigger_modal: false
    }
  },
  components: {
    Modal
  },
  watch: {
    modal() {
      let self = this
      setTimeout(() => {
        self.tigger_modal = self.modal
      }, 50)
    }
  },
  methods: {
    doCloseModal() {
      this.$emit('closeModal', false)
    },
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>

<style lang="stylus">
.icon-close
  position: absolute
  right: 0
  margin-right: 5px
  margin-top: -12px
  color: black !important
</style>
