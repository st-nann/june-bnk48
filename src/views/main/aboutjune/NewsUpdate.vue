<template>
  <v-container
    :class="{
      'px-3': $vuetify.breakpoint.smAmdDown,
      'px-0': $vuetify.breakpoint.lgAndUp
    }"
  >
    <v-layout row wrap justify-center justify-space-between>
      <v-flex xs12 class="text-xs-center">
        <div class="font-size-30 font-weight-bold mb-2">
          NEWS UPDATE
        </div>
      </v-flex>
      <v-flex xs8 offset-xs2 sm2 offset-sm5 class="mb-4">
        <v-divider class="title-line mx-5"></v-divider>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="elevation-5">
      <v-flex xs12 sm9>
        <v-img
          :src="
            doGetImage(
              newsupdate.instagram.image.name,
              newsupdate.instagram.image.token
            )
          "
          :lazy-src="
            doGetImage(
              newsupdate.instagram.image.name,
              newsupdate.instagram.image.token
            )
          "
          width="100%"
        ></v-img>
      </v-flex>
      <v-flex xs12 sm3>
        <v-card
          class="elfsight-app-8c851844-0af8-42f1-b7a3-3f95cccb5829"
          :style="
            $vuetify.breakpoint.mdAndDown
              ? $vuetify.breakpoint.sm
                ? 'height: 300px;'
                : $vuetify.breakpoint.xs
                ? 'height: 480px;'
                : 'height: 360px;'
              : 'height: 436px;'
          "
          width="100%"
        ></v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="elevation-5 my-4">
      <v-flex xs12 order-xs2 sm3 order-sm1>
        <iframe
          :src="
            $vuetify.breakpoint.xs
              ? newsupdate.facebook.src.mobile
              : newsupdate.facebook.src.desktop
          "
          :width="$vuetify.breakpoint.xs ? '340' : '100%'"
          :height="$vuetify.breakpoint.xs ? '494' : '100%'"
          style="border:none;overflow:hidden"
          scrolling="no"
          frameborder="0"
          allowTransparency="true"
          allow="encrypted-media"
        ></iframe>
      </v-flex>
      <v-flex xs12 order-xs1 sm9 order-sm2>
        <v-img
          :src="
            doGetImage(
              newsupdate.facebook.image.name,
              newsupdate.facebook.image.token
            )
          "
          :lazy-src="
            doGetImage(
              newsupdate.facebook.image.name,
              newsupdate.facebook.image.token
            )
          "
          width="100%"
        ></v-img>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="elevation-5">
      <v-flex xs3>
        <v-img
          :src="
            doGetImage(
              newsupdate.event.title.image.name,
              newsupdate.event.title.image.token
            )
          "
          :lazy-src="
            doGetImage(
              newsupdate.event.title.image.name,
              newsupdate.event.title.image.token
            )
          "
          width="100%"
          height="100%"
        ></v-img>
      </v-flex>
      <v-flex xs6>
        <v-card flat tile>
          <v-window v-model="onboarding">
            <v-window-item v-for="(item, index) in announcements" :key="index">
              <v-img
                :src="doGetImage(item.image.name, item.image.token)"
                :lazy-src="doGetImage(item.image.name, item.image.token)"
                width="100%"
              ></v-img>
            </v-window-item>
          </v-window>
          <v-card-actions class="bg-event">
            <v-layout row wrap>
              <v-flex xs12 class="text-xs-center">
                <v-item-group v-model="onboarding" mandatory>
                  <v-item
                    v-for="(item, index) in announcements.length"
                    :key="index"
                  >
                    <v-icon
                      slot-scope="{ active, toggle }"
                      :input-value="active"
                      @click="toggle"
                      size="18"
                      :color="onboarding === index ? 'brown' : 'grey lighten-2'"
                    >
                      mdi-record
                    </v-icon>
                  </v-item>
                </v-item-group>
              </v-flex>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-img
          :src="
            doGetImage(
              newsupdate.event.image.name,
              newsupdate.event.image.token
            )
          "
          :lazy-src="
            doGetImage(
              newsupdate.event.image.name,
              newsupdate.event.image.token
            )
          "
          width="100%"
          height="100%"
        ></v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import data from '@/services/data/aboutjune/NewsUpdate'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  data() {
    return {
      onboarding: 0
    }
  },
  computed: {
    background() {
      return data ? data.background : {}
    },
    announcements() {
      return data ? data.announcements : []
    },
    newsupdate() {
      return data ? data.newsupdate : {}
    }
  },
  created() {
    let script = document.createElement('script')
    script.setAttribute('src', 'https://apps.elfsight.com/p/platform.js')
    document.head.appendChild(script)
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>

<style lang="stylus">
.title-line
  border: 1.5px solid #000000
  border-color: #000000 !important
  border-radius: 50px

.bg-event
  background: #3d4868
</style>
