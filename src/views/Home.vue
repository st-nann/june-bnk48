<template>
  <transition name="fade">
    <v-layout row wrap>
      <v-flex xs12>
        <v-img
          :src="
            $vuetify.breakpoint.mdAndDown
              ? $vuetify.breakpoint.xs
                ? doGetImage(home.mobile.name, home.mobile.token)
                : doGetImage(home.tablet.name, home.tablet.token)
              : doGetImage(home.desktop.name, home.desktop.token)
          "
          :lazy-src="
            $vuetify.breakpoint.mdAndDown
              ? $vuetify.breakpoint.xs
                ? doGetImage(home.mobile.name, home.mobile.token)
                : doGetImage(home.tablet.name, home.tablet.token)
              : doGetImage(home.desktop.name, home.desktop.token)
          "
          :ratio="ratio"
          width="100%"
          height="100%"
        >
          <div
            class="button"
            :class="{
              'ma-3': $vuetify.breakpoint.smAndUp,
              'mx-3 my-2': $vuetify.breakpoint.xs
            }"
          >
            <v-btn
              class="elevation-3"
              :class="{
                'pa-4': $vuetify.breakpoint.mdAndDown && !$vuetify.breakpoint.xs
              }"
              :color="$vuetify.breakpoint.mdAndDown ? 'white' : 'grey darken-3'"
              append
              :to="{ path: '/about_june' }"
              round
              outline
              dark
            >
              about juné
              <v-icon
                class="ml-1"
                :color="
                  $vuetify.breakpoint.mdAndDown ? 'white' : 'grey darken-3'
                "
                size="18"
              >
                mdi-chevron-right-circle-outline
              </v-icon>
            </v-btn>
          </div>
        </v-img>
      </v-flex>
    </v-layout>
  </transition>
</template>

<script>
import data from '@/services/data/Home'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  computed: {
    home() {
      return data ? data.home : {}
    },
    ratio() {
      switch (this.$vuetify.breakpoint.name) {
        default:
          return 1.78
        case 'xl':
          return 1.78
        case 'lg':
          return 1.78
        case 'md':
          return 1.33
        case 'sm':
          return 1.75
        case 'xs':
          return 1.5
      }
    }
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>

<style lang="stylus">
.button
  position: fixed
  bottom: 0
  right: 0
</style>
