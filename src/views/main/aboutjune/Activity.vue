<template>
  <v-card class="pa-3" flat>
    <v-card-text>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs12 lg10 offset-lg1>
          <v-container fluid grid-list-md class="px-0">
            <v-layout row wrap>
              <v-flex xs12 sm3>
                <v-card class="elevation-8">
                  <v-img
                    :src="doGetImage(title.image.name, title.image.token)"
                    width="100%"
                  ></v-img>
                  <v-card-title class="py-3">
                    <div class="font-weight-bold">
                      {{ title.name }}
                      <v-icon size="15" color="grey darken-3">
                        mdi-chevron-right-circle-outline
                      </v-icon>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex xs12 sm9>
                <v-data-iterator
                  class="pa-3 grey lighten-4"
                  :items="activity"
                  :rows-per-page-items="[item_per_page]"
                  :pagination.sync="pagination"
                  content-tag="v-layout"
                  row
                  wrap
                >
                  <template v-slot:item="props">
                    <v-flex xs12 sm6 lg4>
                      <v-card class="elevation-5">
                        <v-img
                          :src="
                            doGetImage(
                              props.item.cover.name,
                              props.item.cover.token
                            )
                          "
                          aspect-ratio="1.5"
                        ></v-img>
                        <v-card-title primary-title class="pt-3 pb-0">
                          <div class="title mb-0">{{ props.item.name }}</div>
                        </v-card-title>
                        <v-card-text class="caption py-0">
                          <Period :activity="props.item"></Period>
                        </v-card-text>
                        <v-card-actions>
                          <v-btn
                            color="orange"
                            @click="doOpenModal(props.item)"
                            small
                            flat
                          >
                            View detail
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-flex>
                  </template>
                </v-data-iterator>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
    </v-card-text>
    <ActivityDetail
      :modal="modal"
      :activity_detail="activity_detail"
      v-on:closeModal="eventChildCloseModal"
    ></ActivityDetail>
  </v-card>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import data from '@/services/data/Activity'
import { getImageFromStore } from '@/services/functions/Services'
import Period from '@/views/main/aboutjune/detail/Period'
import ActivityDetail from '@/views/main/aboutjune/modal/ActivityDetail'

export default {
  data() {
    return {
      pagination: {},
      modal: false,
      activity_detail: undefined
    }
  },
  components: {
    Period,
    ActivityDetail
  },
  computed: {
    title() {
      return data ? data.title : {}
    },
    activity() {
      return data ? data.activity : []
    },
    item_per_page() {
      let itemPerPage
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          itemPerPage = 1
          break
        case 'sm':
          itemPerPage = 2
          break
        case 'md':
          itemPerPage = 2
          break
        case 'lg':
          itemPerPage = 3
          break
        case 'xl':
          itemPerPage = 4
          break
        default:
          itemPerPage = 3
      }
      Vue.set(this.pagination, 'rowsPerPage', itemPerPage)
      return itemPerPage
    }
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    },
    doOpenModal(activity) {
      this.activity_detail = activity
      this.modal = true
    },
    eventChildCloseModal(close) {
      this.modal = close
    }
  }
}
</script>
