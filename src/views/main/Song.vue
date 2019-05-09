<template>
  <v-layout row wrap>
    <v-flex xs12>
      <img :src="doGetImage(cover.name, cover.token)" width="100%" />
    </v-flex>
  </v-layout>
</template>

<script>
import data from '@/services/data/Song'
import { getImageFromStore } from '@/services/functions/Services'

export default {
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

<style lang="stylus" scoped></style>
