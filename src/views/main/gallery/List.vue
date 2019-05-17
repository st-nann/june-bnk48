<template>
  <div>
    <v-container
      grid-list-sm
      fluid
      :class="{
        'py-2 px-5': $vuetify.breakpoint.lgAndUp,
        'pa-3': $vuetify.breakpoint.mdAndDown
      }"
    >
      <v-layout row wrap>
        <v-flex xs4 sm3 lg2 v-for="(data, index) in image_lists" :key="index">
          <v-container v-if="data.credit" fill-height>
            <v-layout
              row
              wrap
              align-center
              justify-center
              class="text-xs-center"
            >
              <v-flex xs12>
                <v-avatar
                  :size="150"
                  class="white--text elevation-3"
                  color="coral"
                >
                  <img
                    v-if="doMapIcon(data.credit)"
                    :src="doGetImage(icon.name, icon.token)"
                  />
                  <div v-else>
                    {{ data.credit.substring(0, 1).toUpperCase() }}
                  </div>
                </v-avatar>
                <div class="mt-3 subheading font-weight-bold">
                  {{ data.credit }}
                </div>
              </v-flex>
            </v-layout>
          </v-container>
          <v-card
            v-else
            flat
            tile
            v-ripple
            class="clickable"
            @click="doOpenModal(data)"
          >
            <v-img
              :src="doGetImage(data.image.name, data.image.token)"
              :lazy-src="doGetImage(data.image.name, data.image.token)"
              :height="$vuetify.breakpoint.xs ? '150px' : '330px'"
            >
              <template v-slot:placeholder>
                <v-layout fill-height align-center justify-center ma-0>
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
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
  </div>
</template>

<script>
import _ from 'lodash'
import data from '@/services/data/gallery/EventIconCredit'
import { getImageFromStore } from '@/services/functions/Services'
import ImageModal from '@/views/main/gallery/modal/Image'

export default {
  props: ['image_lists', 'tab'],
  data() {
    return {
      modal: false,
      item: {},
      icon: {}
    }
  },
  components: {
    ImageModal
  },
  computed: {
    icons() {
      return data ? data.icon : {}
    }
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    },
    doOpenModal(item) {
      this.item = item
      this.modal = true
    },
    doMapIcon(credit) {
      let item = _.find(this.icons, { name: credit })
      this.icon = item ? item.image : undefined
      return this.icon && JSON.stringify(this.icon) !== '{}'
    },
    eventChildCloseModal(close) {
      this.modal = close
    }
  }
}
</script>
