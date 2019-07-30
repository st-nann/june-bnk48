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
    <v-layout row wrap>
      <v-flex xs12 lg9 :class="{ 'px-2': $vuetify.breakpoint.lgAndUp }">
        <v-layout row wrap>
          <v-flex xs12>
            <youtube
              :video-id="videoId"
              class="elevation-8 mb-2"
              style="background: #3C1D25;"
              player-width="100%"
              :player-height="
                $vuetify.breakpoint.mdAndDown
                  ? $vuetify.breakpoint.sm
                    ? 300
                    : $vuetify.breakpoint.xs
                    ? 200
                    : 360
                  : 449
              "
              :player-vars="{ start: 0, autoplay: 0 }"
            ></youtube>
          </v-flex>
          <v-flex xs12 lg5>
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
              class="elevation-8"
              width="100%"
              style="z-index: 2;"
            >
            </v-img>
          </v-flex>
          <v-flex xs12 lg7>
            <v-card
              flat
              tile
              z-index="1"
              :class="{ 'my-3': $vuetify.breakpoint.mdAndDown }"
            >
              <v-window v-model="onboarding">
                <v-window-item
                  v-for="(item, index) in announcements"
                  :key="index"
                  class="elevation-5"
                >
                  <v-img
                    :src="doGetImage(item.image.name, item.image.token)"
                    :lazy-src="doGetImage(item.image.name, item.image.token)"
                    width="100%"
                  ></v-img>
                </v-window-item>
              </v-window>
              <v-card-actions>
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
                          :color="
                            onboarding === index ? 'brown' : 'grey lighten-2'
                          "
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
        </v-layout>
      </v-flex>
      <v-flex xs12 lg3>
        <v-layout row wrap>
          <v-flex xs12 sm6 md5 lg12>
            <v-card
              class="elfsight-app-8c851844-0af8-42f1-b7a3-3f95cccb5829"
              :style="
                $vuetify.breakpoint.mdAndDown
                  ? $vuetify.breakpoint.sm
                    ? 'height: 510px;'
                    : $vuetify.breakpoint.xs
                    ? 'height: 480px;'
                    : 'height: 640px;'
                  : 'height: 453px;'
              "
              width="100%"
            ></v-card>
          </v-flex>
          <v-flex xs12 sm6 md5 lg12>
            <iframe
              :src="
                $vuetify.breakpoint.xs
                  ? newsupdate.facebook.src.mobile
                  : $vuetify.breakpoint.lgAndUp || $vuetify.breakpoint.sm
                  ? newsupdate.facebook.src.desktop
                  : newsupdate.facebook.src.tablet
              "
              :width="$vuetify.breakpoint.xs ? '343' : '100%'"
              :height="
                $vuetify.breakpoint.xs
                  ? '494'
                  : $vuetify.breakpoint.lgAndUp || $vuetify.breakpoint.sm
                  ? '509'
                  : '640'
              "
              :class="{
                'mt-2 elevation-5':
                  $vuetify.breakpoint.lgAndUp || $vuetify.breakpoint.xs
              }"
              style="border:none;overflow:hidden"
              scrolling="no"
              frameborder="0"
              allowTransparency="true"
              allow="encrypted-media"
            ></iframe>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import data from '@/services/data/aboutjune/NewsUpdate'
import { getImageFromStore } from '@/services/functions/Services'
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

export default {
  data() {
    return {
      videoId: 'videoId',
      url: '',
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
    this.doGetMedia(this.newsupdate.video)
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    },
    doGetMedia(url) {
      this.videoId = this.$youtube.getIdFromURL(`${url}`)
      this.url = url
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
  background: #DED9DD

#eapps-instagram-feed-1
  box-shadow: none !important

.fullscreen
  position: absolute
  right: 0
  bottom: 0
</style>
