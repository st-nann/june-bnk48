<template>
  <div>
    <v-dialog v-model="modal" max-width="800px" persistent scrollable>
      <Modal
        v-if="activity_detail"
        :title="activity_detail.name"
        description=""
        button="Close"
        :closeModal="doCloseModal"
      >
        <div slot="body">
          <v-card flat class="font-thai pt-0">
            <v-card-text class="pt-0">
              <Period :activity="activity_detail"></Period>
            </v-card-text>
            <v-card-text class="pt-0">
              {{ activity_detail.detail.description }}
            </v-card-text>
            <v-card-text class="pt-0">
              <v-window
                v-model="slide_image"
                :touch="{
                  left: () => swipe('Left'),
                  right: () => swipe('Right')
                }"
              >
                <v-window-item
                  v-for="(item, index) in activity_detail.detail.image"
                  :key="index"
                  class="lightgrey"
                >
                  <v-layout
                    align-center
                    justify-center
                    fill-height
                    tag="v-card-text"
                  >
                    <img
                      :src="doGetImage(item.name, item.token)"
                      class="elevation-20"
                      width="100%"
                    />
                  </v-layout>
                </v-window-item>
              </v-window>
              <v-card-actions class="lightgrey">
                <v-layout row wrap class="button-group">
                  <v-flex xs12 class="text-xs-center">
                    <v-item-group v-model="slide_image" mandatory>
                      <v-item
                        v-for="(item, index) in activity_detail.detail.image
                          .length"
                        :key="`btn-${index}`"
                      >
                        <v-icon
                          slot-scope="{ active, toggle }"
                          :input-value="active"
                          class="mx-1"
                          :size="$vuetify.breakpoint.xs ? 15 : 20"
                          color="white"
                          :style="
                            index === slide_image
                              ? 'opacity: 1;'
                              : 'opacity: .4;'
                          "
                          @click="toggle"
                        >
                          mdi-record
                        </v-icon>
                      </v-item>
                    </v-item-group>
                  </v-flex>
                </v-layout>
              </v-card-actions>
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
  data() {
    return {
      slide_image: 0
    }
  },
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
