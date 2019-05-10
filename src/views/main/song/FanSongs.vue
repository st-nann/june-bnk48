<template>
  <v-layout row wrap>
    <v-flex xs6 class="text-xs-center">
      <youtube
        :video-id="videoId"
        player-width="100%"
        player-height="550"
        :player-vars="{ autoplay: 0 }"
      ></youtube>
    </v-flex>
    <v-flex xs6 class="pl-5">
      <v-container
        id="scroll-target"
        style="max-height: 500px"
        class="scroll-y"
      >
        <v-card
          v-for="(item, index) in fansongs"
          :key="index"
          class="ma-3 pa-3 elevation-8"
        >
          <v-layout row wrap class="py-2">
            <v-flex xs3 class="text-xs-center">
              <v-icon size="80" color="grey">
                mdi-play-speed
              </v-icon>
            </v-flex>
            <v-flex xs6>
              <div class="subheading font-weight-bold font-thai">{{ item.name }}</div>
              <div>- {{ item.artist }}</div>
              <div>
                <v-icon size="18">mdi-timer</v-icon>
                {{ item.time }}
              </div>
            </v-flex>
            <v-flex xs3 class="text-xs-center">
              <v-btn
                class="px-4 mt-4"
                color="coral"
                round
                outline
                @click="doGetMedia(item.link)"
              >
                view
              </v-btn>
            </v-flex>
           </v-layout>
        </v-card>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import data from '@/services/data/Song'
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'

export default {
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
      this.videoId = this.$youtube.getIdFromURL(url)
      this.startTime = this.$youtube.getTimeFromURL(url)
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
