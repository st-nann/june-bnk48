<template>
  <div v-if="activity_detail">
    <v-dialog v-model="modal" max-width="700px" persistent scrollable>
      <Modal
        :title="activity_detail.name"
        description=""
        button="Close"
        :closeModal="doCloseModal"
      >
        <div slot="body">
          <v-card flat class="font-thai pt-0">
            <v-card-text>
              <Period :activity="activity_detail"></Period>
            </v-card-text>
            <v-card-text>
              {{ activity_detail.detail.description }}
            </v-card-text>
            <v-card-text v-for="(item, index) in  activity_detail.detail.image" :key="index">
              <img :src="doGetImage(item.name, item.token)" />
            </v-card-text>
          </v-card>
        </div>
      </Modal>
    </v-dialog>
  </div>
</template>

<script>
import Modal from '@/components/base/Modal'
import Period from '@/views/main/aboutjune/detail/Period'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  props: ['modal', 'activity_detail'],
  components: {
    Modal,
    Period
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
