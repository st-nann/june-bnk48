<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
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
    </v-layout>
    <v-layout row wrap>
      <v-flex
        xs12
        lg8
        class="text-xs-center"
        :class="{
          'pt-5 px-4': $vuetify.breakpoint.smAndDown,
          'pt-5 px-5': $vuetify.breakpoint.mdAndUp
        }"
      >
        <img
          width="100%"
          :src="doGetImage(profiles.image.name, profiles.image.token)"
        />
      </v-flex>
      <v-flex
        xs12
        md10
        offset-md1
        lg4
        offset-lg0
        :class="{
          'pt-5 mt-5': $vuetify.breakpoint.lgAndUp
        }"
      >
        <v-card
          class="elevation-0"
          :class="{
            'pa-3': $vuetify.breakpoint.smAndDown,
            'pa-0 ': $vuetify.breakpoint.mdAndUp
          }"
          color="transparent"
        >
          <v-card-text
            :class="{
              'px-0 ': $vuetify.breakpoint.mdAndUp
            }"
          >
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
                  <v-flex
                    xs12
                    sm3
                    class="font-weight-bold grey--text text--darken-3"
                  >
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
  </div>
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

<style lang="stylus">
.carousel-item .v-image__image--cover
  background-size: contain
.line
  border: 2px solid #000000
  width: 100px
</style>
