<template>
  <v-layout>
    <v-flex xs12 lg12>
        <v-container
          grid-list-sm
          fluid
          :class="{
            'pa-5': $vuetify.breakpoint.lgAndUp,
            'pa-3': $vuetify.breakpoint.mdAndDown
          }">
          <v-layout row wrap>
            <v-flex
              v-for="(item, index) in image_lists"
              :key="index"
              xs4 sm3 lg2
            >
              <v-card flat tile>
                <v-img
                  :src="doGetImage(item.image.name, item.image.token)"
                  :height="$vuetify.breakpoint.xs ? '150px' : '330px'"
                ></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-flex>
  </v-layout>
</template>


<script>
import { getImageFromStore } from '@/services/functions/Services'

export default {
  props: ['image_lists'],
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>
