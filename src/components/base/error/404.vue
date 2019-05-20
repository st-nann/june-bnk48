<template>
  <v-container fill-height align-center>
    <v-layout row wrap fill-height justify-center align-center>
      <v-flex xs12 lg10 offset-lg1>
        <v-card
          class="elevation-10"
          :class="{
            'pa-5': !$vuetify.breakpoint.xs,
            'pa-2': $vuetify.breakpoint.xs
          }"
        >
          <v-layout row wrap>
            <v-flex xs12 order-xs2 lg6 order-lg1>
              <v-img
                :src="doGetImage(error.image.name, error.image.token)"
                :lazy-src="doGetImage(error.image.name, error.image.token)"
                width="100%"
              ></v-img>
            </v-flex>
            <v-flex xs12 order-xs1 lg6 order-lg2>
              <v-card-text :class="{ 'ml-4': $vuetify.breakpoint.lgAndUp }">
                <div
                  class="font-weight-bold display-1 grey--text text--darken-2"
                >
                  Oops !
                </div>
                <div class="title grey--text text--darken-2 pt-3">
                  You have some problems.
                </div>
                <div class="body-2 grey--text text--darken-1 pt-1">
                  The page you are looking for was moved, removed, renamed or
                  might never existed.
                </div>
                <v-btn
                  append
                  :to="{ path: '/' }"
                  class="mx-0 mt-3"
                  color="brown"
                  outline
                  small
                >
                  Go back
                </v-btn>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import data from '@/services/data/Error'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  computed: {
    error() {
      return data ? data.error : {}
    }
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>
