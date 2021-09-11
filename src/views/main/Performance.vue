<template>
  <v-layout row wrap>
    <v-flex xs12>
      <Category></Category>
    </v-flex>
  </v-layout>
</template>

<script>
import data from '@/services/data/Performance'
import Category from '@/views/main/performance/Category'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  components: {
    Category
  },
  computed: {
    cover() {
      return data ? data.cover : {}
    },
    category() {
      return data ? date.category : []
    }
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>
