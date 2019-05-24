<template>
  <div>
    <v-container grid-list-md class="px-0">
      <v-layout row wrap>
        <v-flex xs12 md4 lg3 class="pa-0">
          <v-img
            :src="
              $vuetify.breakpoint.smAndDown
                ? doGetImage(title.image.mobile.name, title.image.mobile.token)
                : doGetImage(
                    title.image.desktop.name,
                    title.image.desktop.token
                  )
            "
            :lazy-src="
              $vuetify.breakpoint.smAndDown
                ? doGetImage(title.image.mobile.name, title.image.mobile.token)
                : doGetImage(
                    title.image.desktop.name,
                    title.image.desktop.token
                  )
            "
            width="100%"
          ></v-img>
        </v-flex>
        <v-flex
          xs12
          md8
          lg9
          class="bg-item"
          :class="{
            'pt-0': $vuetify.breakpoint.smAndDown
          }"
        >
          <v-data-iterator
            class="pb-0 px-3"
            :class="{
              'pt-3': $vuetify.breakpoint.mdAndUp,
              'pt-5': $vuetify.breakpoint.smAndDown
            }"
            :items="activity"
            :rows-per-page-items="[item_per_page]"
            :pagination.sync="pagination"
            content-tag="v-layout"
            row
            wrap
          >
            <template v-slot:item="props">
              <v-flex xs12 sm8 offset-sm2 md6 offset-md0 lg4>
                <v-card
                  class="elevation-5 clickable"
                  @click="doOpenModal(props.item)"
                >
                  <v-img
                    :src="
                      doGetImage(props.item.cover.name, props.item.cover.token)
                    "
                    aspect-ratio="1.5"
                  ></v-img>
                  <v-card-title primary-title class="pt-3 pb-0">
                    <div class="title mb-0">{{ props.item.name }}</div>
                  </v-card-title>
                  <v-card-text class="caption pt-0 pb-3">
                    <Period :activity="props.item"></Period>
                  </v-card-text>
                </v-card>
              </v-flex>
            </template>
          </v-data-iterator>
        </v-flex>
      </v-layout>
    </v-container>
    <ActivityDetail
      :modal="modal"
      :activity_detail="activity_detail"
      v-on:closeModal="eventChildCloseModal"
    ></ActivityDetail>
  </div>
</template>

<script>
import _ from 'lodash'
import Vue from 'vue'
import data from '@/services/data/aboutjune/Activity'
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
      return data
        ? _.orderBy(
            data.activity,
            ['detail.period.expiry', 'detail.period.start'],
            ['desc', 'asc']
          )
        : []
    },
    item_per_page() {
      let itemPerPage
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          itemPerPage = 1
          break
        case 'sm':
          itemPerPage = 1
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

<style lang="stylus">
.title-line
  border: 1.5px solid #000000
  border-color: #000000 !important
  border-radius: 50px
  margin: 0 60px

.bg-item
  background: #f8d1a7
</style>
