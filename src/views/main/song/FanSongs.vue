<template>
  <div class="mb-4">
    <v-layout row wrap>
      <v-flex
        xs3
        md4
        lg5
        :class="{
          'mt-3': $vuetify.breakpoint.xs,
          'mt-5': $vuetify.breakpoint.smAndUp
        }"
      >
        <v-divider></v-divider>
      </v-flex>
      <v-flex xs6 md4 lg2 class="text-xs-center mb-5">
        <div
          class="font-weight-bold"
          :class="{
            'font-size-24': $vuetify.breakpoint.xs,
            'font-size-45': $vuetify.breakpoint.smAndUp
          }"
        >
          Fan songs
        </div>
      </v-flex>
      <v-flex
        xs3
        md4
        lg5
        :class="{
          'mt-3': $vuetify.breakpoint.xs,
          'mt-5': $vuetify.breakpoint.smAndUp
        }"
      >
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 lg6 class="text-xs-center mb-3">
        <youtube
          :video-id="videoId"
          player-width="100%"
          :player-height="
            $vuetify.breakpoint.mdAndDown
              ? $vuetify.breakpoint.xs
                ? 250
                : 500
              : 400
          "
          :player-vars="{ autoplay: 0 }"
        ></youtube>
      </v-flex>
      <v-flex xs12 lg6 :class="{ 'pl-5': $vuetify.breakpoint.lgAndUp }">
        <label
          class="font-weight-bold subheading"
          :class="{
            'px-1 pt-3': $vuetify.breakpoint.xs,
            'pa-4': $vuetify.breakpoint.smAndUp
          }"
        >
          LISTS ({{ fansongs.length }})
        </label>
        <v-container
          id="scroll-target"
          style="max-height: 400px"
          class="scroll-y"
          :class="{
            'pa-0 mt-2': $vuetify.breakpoint.xs,
            'mt-4 pt-0': $vuetify.breakpoint.smAndUp
          }"
        >
          <v-card
            v-for="(item, index) in fansongs"
            :key="index"
            class="ma-0 py-1 elevation-0 clickable"
            :class="{
              'px-1 clickable': $vuetify.breakpoint.xs,
              'px-3': $vuetify.breakpoint.smAndUp,
              'coral--text': videoId === $youtube.getIdFromURL(item.link)
            }"
            ripple
            @click="doGetMedia(item.link)"
          >
            <v-layout row wrap>
              <v-flex
                xs1
                sm1
                class="pt-3"
                :class="{
                  'text-xs-center': $vuetify.breakpoint.mdAndDown,
                  'text-xs-right': $vuetify.breakpoint.lgAndUp
                }"
              >
                <div
                  :class="{
                    subheading: $vuetify.breakpoint.smAndUp,
                    caption: $vuetify.breakpoint.xs
                  }"
                >
                  {{ index + 1 }}
                </div>
              </v-flex>
              <v-flex xs3 sm3 class="text-xs-center">
                <v-icon
                  :size="$vuetify.breakpoint.xs ? 55 : 60"
                  :color="
                    videoId === $youtube.getIdFromURL(item.link) ? 'coral' : ''
                  "
                >
                  mdi-play-speed
                </v-icon>
              </v-flex>
              <v-flex xs8 sm5 :class="{ 'pt-2': $vuetify.breakpoint.smAndUp }">
                <div
                  class="font-weight-bold font-thai"
                  :class="{
                    subheading: $vuetify.breakpoint.smAndUp,
                    caption: $vuetify.breakpoint.xs
                  }"
                >
                  {{ item.name }}
                </div>
                <div :class="{ caption: $vuetify.breakpoint.xs }">
                  - {{ item.artist }}
                </div>
                <div class="hidden-sm-and-up">
                  <v-icon
                    :size="$vuetify.breakpoint.xs ? 16 : 18"
                    :color="
                      videoId === $youtube.getIdFromURL(item.link)
                        ? 'coral'
                        : ''
                    "
                  >
                    mdi-timer
                  </v-icon>
                  <span :class="{ caption: $vuetify.breakpoint.xs }">
                    {{ item.time }}
                  </span>
                </div>
              </v-flex>
              <v-flex xs3 class="text-xs-center hidden-xs-only pt-3">
                <div>
                  <v-icon
                    size="18"
                    :color="
                      videoId === $youtube.getIdFromURL(item.link)
                        ? 'coral'
                        : ''
                    "
                  >
                    mdi-timer
                  </v-icon>
                  {{ item.time }}
                </div>
              </v-flex>
            </v-layout>
            <v-divider class="mt-2"></v-divider>
          </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import data from '@/services/data/Song'
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

export default {
  data() {
    return {
      videoId: 'videoId',
      url: ''
    }
  },
  computed: {
    fansongs() {
      return data ? data.fansongs : []
    }
  },
  created() {
    this.doGetMedia(this.fansongs[0].link)
  },
  methods: {
    doGetMedia(url) {
      this.videoId = this.$youtube.getIdFromURL(`${url}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
#scroll-target::-webkit-scrollbar-track
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
  border-radius: 10px
  background-color: #F5F5F5

#scroll-target::-webkit-scrollbar
  width: 12px
  background-color: #F5F5F5

#scroll-target::-webkit-scrollbar-thumb
  border-radius: 10px
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3)
  background-color: #a0a0a0
</style>
