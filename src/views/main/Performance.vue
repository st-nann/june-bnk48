<template>
  <v-layout row wrap>
    <v-flex xs12>
      <youtube :video-id="videoId"></youtube>
      <video-player ref="videoPlayer" :options="playerOptions"></video-player>
      <iframe src="https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/bnk48official/videos/1485411278252792/"></iframe>
    </v-flex>
  </v-layout>
</template>

<script>
import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'
import { videoPlayer } from 'vue-video-player'

export default {
  data() {
    return {
      playerOptions: {
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: "https://www.facebook.com/bnk48official/videos/1485411278252792/"
        }]
        // poster: "/static/images/author.jpg",
      }
    }
  },
  components: {
    videoPlayer
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  created() {
    console.log(this)
    this.doGetMedia('https://www.youtube.com/watch?v=zy5qrmNrUbE')
    // this.doGetMedia('https://www.facebook.com/bnk48official/videos/1485411278252792/')
  },
  methods: {
    doGetMedia(url) {
      this.videoId = this.$youtube.getIdFromURL(url)
      this.startTime = this.$youtube.getTimeFromURL(url)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
