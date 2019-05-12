<template>
  <div v-if="JSON.stringify(group) !== '{}'">
    <v-layout row justify-center>
      <v-dialog
        v-model="modal"
        transition="dialog-bottom-transition"
        fullscreen
        persistent
      >
        <v-card>
          <v-layout
            v-if="loading"
            align-center
            justify-center
            fill-height
            tag="v-card-text"
            style="height: 650px;"
          >
            <v-progress-circular
              indeterminate
              :width="3"
              :size="40"
              color="yellow"
            ></v-progress-circular>
          </v-layout>
          <v-card-text v-else>
            <v-layout row wrap>
              <v-flex xs11>
                <div
                  :class="{
                    'font-size-30': $vuetify.breakpoint.smAndUp,
                    'font-size-24': $vuetify.breakpoint.xs
                  }"
                >
                  {{ group.name }}
                </div>
              </v-flex>
              <v-flex xs1 class="text-xs-right">
                <v-icon
                  color="black"
                  size="15"
                  class="clickable"
                  @click="doCloseModal()"
                >
                  mdi-close-circle
                </v-icon>
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
              :class="{
                'pa-4': $vuetify.breakpoint.smAndUp
              }"
            >
              <v-flex
                xs3
                class="hidden-xs-only"
                :class="{ 'px-4': $vuetify.breakpoint.lgAndUp }"
              >
                <img
                  :src="doGetImage(group.image.name, group.image.token)"
                  class="elevation-15 img-border"
                  width="100%"
                />
              </v-flex>
              <v-flex xs1 class="hidden-xs-only text-xs-center">
                <v-divider vertical></v-divider>
              </v-flex>
              <v-flex xs12 sm8 v-if="media.length !== 0">
                <youtube
                  v-if="type === 'youtube'"
                  :video-id="videoId"
                  player-width="100%"
                  :player-height="
                    $vuetify.breakpoint.mdAndDown
                      ? $vuetify.breakpoint.xs
                        ? 220
                        : 380
                      : 550
                  "
                  :player-vars="{ autoplay: 0 }"
                ></youtube>
                <iframe
                  v-else-if="type === 'facebook'"
                  :src="
                    `https://www.facebook.com/plugins/video.php?href=${url}`
                  "
                  frameborder="0"
                  width="100%"
                  :height="
                    $vuetify.breakpoint.mdAndDown
                      ? $vuetify.breakpoint.xs
                        ? 220
                        : 380
                      : 550
                  "
                ></iframe>
                <iframe
                  v-else
                  :src="url"
                  frameborder="0"
                  width="100%"
                  :height="
                    group.name === 'Live'
                      ? $vuetify.breakpoint.xs
                        ? 750
                        : 800
                      : $vuetify.breakpoint.mdAndDown
                      ? $vuetify.breakpoint.xs
                        ? 220
                        : 380
                      : 550
                  "
                ></iframe>
                <v-layout
                  v-if="group.name !== 'Live'"
                  row
                  wrap
                  :class="{
                    'mt-3': $vuetify.breakpoint.mdAndDown,
                    'mt-4': $vuetify.breakpoint.lgAndUp
                  }"
                >
                  <v-flex xs12>
                    <label
                      class="font-weight-bold"
                      :class="{
                        'px-1 pt-3': $vuetify.breakpoint.xs,
                        'pa-4 subheading': $vuetify.breakpoint.smAndUp
                      }"
                    >
                      LISTS ({{ media.length }})
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
                        v-for="(item, index) in media"
                        :key="index"
                        class="ma-0 py-1 elevation-0 clickable font-thai"
                        :class="{
                          'px-1 clickable': $vuetify.breakpoint.xs,
                          'px-3': $vuetify.breakpoint.smAndUp,
                          'coral--text':
                            videoId === $youtube.getIdFromURL(item.link)
                        }"
                        ripple
                        @click="doGetMedia(item.link, item.type)"
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
                          <v-flex xs3 sm2 class="text-xs-center">
                            <v-icon
                              :size="$vuetify.breakpoint.xs ? 50 : 60"
                              :color="
                                videoId === $youtube.getIdFromURL(item.link)
                                  ? 'coral'
                                  : ''
                              "
                            >
                              mdi-filmstrip
                            </v-icon>
                          </v-flex>
                          <v-flex
                            xs8
                            sm5
                            :class="{ 'pt-2': $vuetify.breakpoint.smAndUp }"
                          >
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
                              {{ item.description }}
                            </div>
                            <div class="hidden-sm-and-up">
                              <v-icon
                                :size="$vuetify.breakpoint.xs ? 16 : 18"
                                :color="
                                  videoId === $youtube.getIdFromURL(item.link)
                                    ? 'coral'
                                    : ''
                                "
                                style="verrtical-align: middle;"
                              >
                                mdi-timer
                              </v-icon>
                              <span
                                :class="{ caption: $vuetify.breakpoint.xs }"
                              >
                                {{ item.time }}
                              </span>
                            </div>
                          </v-flex>
                          <v-flex
                            xs3
                            class="text-xs-center hidden-xs-only pt-3"
                          >
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
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import { getImageFromStore } from '@/services/functions/Services'
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

export default {
  props: ['modal', 'group', 'media'],
  data() {
    return {
      videoId: 'videoId',
      url: '',
      type: 'youtube'
    }
  },
  computed: {
    ...mapState('components', {
      loading: state => state.modal_loading
    })
  },
  watch: {
    modal() {
      if (this.modal) {
        this.updateLoading(true)
      }
    },
    media: {
      handler() {
        this.doGetMedia(this.media[0].link, this.media[0].type)
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('components', ['updateLoading']),
    doCloseModal() {
      this.$emit('closeModal', false)
    },
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    },
    doGetMedia(url, type) {
      this.videoId = this.$youtube.getIdFromURL(`${url}`)
      this.url = url
      this.type = type
    }
  }
}
</script>

<style lang="stylus" scoped>
.img-border
  border-radius: 8px

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
