<template>
  <v-layout>
    <v-flex xs12 lg12>
      <v-container
        grid-list-sm
        fluid
        :class="{
          'py-2 px-5': $vuetify.breakpoint.lgAndUp,
          'pa-3': $vuetify.breakpoint.mdAndDown
        }">
        <v-layout row wrap>
          <v-flex
            v-for="(item, index) in image_lists"
            :key="index"
            xs4 sm3 lg2
          >
            <v-card
              flat
              tile
              v-ripple
              class="clickable"
              @click="doOpenModal(item)"
            >
              <v-img
                :src="doGetImage(item.image.name, item.image.token)"
                :lazy-src="doGetImage(item.image.name, item.image.token)"
                :height="$vuetify.breakpoint.xs ? '150px' : '330px'"
              >
                <template v-slot:placeholder>
                  <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-layout>
                </template>
              </v-img>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <ImageModal
        :modal="modal"
        :item="item"
        v-on:closeModal="eventChildCloseModal"
      ></ImageModal>
    </v-flex>
  </v-layout>
</template>


<script>
import { getImageFromStore } from '@/services/functions/Services'
import ImageModal from '@/views/main/gallery/modal/Image'

export default {
  props: ['image_lists'],
  data() {
    return {
      modal: false,
      item: {}
    }
  },
  components: {
    ImageModal
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    },
    doOpenModal(item) {
      this.item = item
      this.modal = true
    },
    eventChildCloseModal(close) {
      this.modal = close
    }
  }
}
</script>
