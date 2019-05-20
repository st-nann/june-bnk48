<template>
  <v-card class="pa-3" flat>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs12 lg10 offset-lg1>
          <div class="headline my-2">Activity</div>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs12 lg10 offset-lg1>
          <v-container fluid grid-list-md>
            <v-data-iterator
              :items="activity"
              :rows-per-page-items="[item_per_page]"
              :pagination.sync="pagination"
              content-tag="v-layout"
              row
              wrap
            >
              <template v-slot:item="props">
                <v-flex xs12 sm6 md4 lg3>
                  <v-card>
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
import data from '@/services/data/Activity'
import { getImageFromStore } from '@/services/functions/Services'
import Period from '@/views/main/aboutjune/detail/Period'
import ActivityDetail from '@/views/main/aboutjune/modal/ActivityDetail'

export default {
  data() {
    return {
      pagination: {
        rowsPerPage: 4
      },
      modal: false,
      activity_detail: undefined
    }
  },
  components: {
    Period,
    ActivityDetail
  },
  computed: {
    activity() {
      return data ? data.activity : []
    },
    item_per_page() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 12
        case 'sm':
          return 3
        case 'md':
          return 3
        case 'lg':
          return 4
        case 'xl':
          return 6
        default:
          return 4
      }
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
