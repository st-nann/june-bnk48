<template>
  <v-layout row wrap>
    <v-flex xs12>
      <img :src="doGetImage(cover.name, cover.token)" width="100%" />
    </v-flex>
    <v-flex
      xs12
      :class="{
        'pa-3': $vuetify.breakpoint.xs,
        'pa-5': $vuetify.breakpoint.smAndUp
      }"
    >
      <Palylists></Palylists>
    </v-flex>
    <v-flex
      xs12
      :class="{
        'pa-3': $vuetify.breakpoint.xs,
        'pa-5': $vuetify.breakpoint.smAndUp
      }"
    >
      <FanSongs></FanSongs>
    </v-flex>
  </v-layout>
</template>

<script>
import data from '@/services/data/Song'
import { getImageFromStore } from '@/services/functions/Services'
import Palylists from '@/views/main/song/Playlists'
import FanSongs from '@/views/main/song/FanSongs'

export default {
  components: {
    Palylists,
    FanSongs
  },
  computed: {
    cover() {
      return data ? data.cover : ''
    }
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>
