<template>
  <v-layout row wrap>
    <v-flex xs12 lg8>
      <v-carousel
        class="elevation-20"
        :interval="5000"
        :height="$vuetify.breakpoint.xs ? 300 : 888"
        :touch="{
          left: () => swipe('Left'),
          right: () => swipe('Right')
        }"
        cycle
        dark
        hide-delimiters
      >
        <v-carousel-item
          v-for="(item, index) in items"
          :key="index"
          :src="doGetImage(item.name, item.token)"
          class="carousel-item offwhite"
        ></v-carousel-item>
      </v-carousel>
    </v-flex>
    <v-flex xs12 lg4>
      <v-card
        class="elevation-0"
        :class="{
          'pa-3': $vuetify.breakpoint.xs,
          'pa-5 ': $vuetify.breakpoint.smAndUp
        }"
        color="transparent"
      >
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <div class="headline font-weight-bold">
                {{ profiles.firstname.eng }} {{ profiles.lastname.eng }}
              </div>
              <div class="subtitle font-weight-bold font-thai">
                {{ profiles.firstname.thai }} {{ profiles.lastname.thai }}
                <span class="grey--text text--darken-1">
                  - {{ profiles.nickname.eng }} ({{ profiles.nickname.thai }})
                </span>
              </div>
              <v-divider class="my-3 line"></v-divider>
            </v-flex>
            <v-flex x12>
              <v-layout
                row
                wrap
                v-for="(item, index) in Object.keys(profiles.detail)"
                :key="index"
                class="px-3 py-2 subheading"
              >
                <v-flex xs12 sm3 class="font-weight-bold grey--text text--darken-3">
                  {{ doConvertText(item) }}
                </v-flex>
                <v-flex xs12 sm9 class="font-thai">
                  <div v-if="typeof profiles.detail[item] === 'object'">
                    <div
                      v-for="(subitem, subindex) in Object.keys(
                        profiles.detail[item]
                      )"
                      :key="subindex"
                    >
                      {{ profiles.detail[item][subitem] }}
                    </div>
                  </div>
                  <div v-else>
                    {{ profiles.detail[item] | date }}
                  </div>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from 'lodash'
import data from '@/services/data/Profile'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  computed: {
    items() {
      return data ? data.carousel : []
    },
    profiles() {
      return data ? data.profile : {}
    }
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    },
    doConvertText(text) {
      return _.capitalize(_.split(text, '_').join(' '))
    }
  }
}
</script>

<style lang="stylus" scoped>
.carousel-item .v-image__image--cover
  background-size: contain
.line
  border: 2px solid #000000
  width: 100px
</style>
