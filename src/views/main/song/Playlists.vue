<template>
  <v-layout row wrap>
    <v-flex xs12 sm3>
      <div class="border pl-3 mb-3">
        <div
          :class="{
            'display-4': $vuetify.breakpoint.lgAndUp,
            'display-3': $vuetify.breakpoint.mdAndDown
          }"
        >
          Juné's
        </div>
        <div
          :class="{
            'display-3': $vuetify.breakpoint.lgAndUp,
            headline: $vuetify.breakpoint.mdAndDown
          }"
        >
          playlist
        </div>
      </div>
    </v-flex>
    <v-flex xs12 sm8 offset-sm1 md9 offset-md0>
      <v-layout row wrap>
        <v-flex xs12 sm3 v-for="(item, index) in playlists" :key="index">
          <v-container fluid grid-list-md>
            <v-hover class="clickable">
              <a slot-scope="{ hover }" :href="item.link" target="_blank">
                <v-card class="card-image elevation-8">
                  <v-img :src="doGetImage(item.name, item.token)" width="100%">
                    <v-container
                      fill-height
                      fluid
                      :py-1="$vuetify.breakpoint.lgAndUp"
                      :py-0="$vuetify.breakpoint.mdAndDown"
                      px-2
                    >
                      <v-layout fill-height>
                        <v-flex xs12 align-end flexbox class="text-xs-right">
                          <span
                            class="white--text font-weight-bold"
                            :class="{
                              title: $vuetify.breakpoint.lgAndUp,
                              subheading: $vuetify.breakpoint.mdAndDown
                            }"
                            v-text="item.source"
                          ></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out darkbrown v-card--reveal white--text"
                        :class="{
                          caption: $vuetify.breakpoint.smAndDown,
                          title: $vuetify.breakpoint.mdAndUp
                        }"
                        style="height: 100%;"
                      >
                        <v-icon
                          :size="$vuetify.breakpoint.lgAndUp ? 150 : 80"
                          color="white"
                        >
                          mdi-{{ item.icon }}
                        </v-icon>
                      </div>
                    </v-expand-transition>
                  </v-img>
                </v-card>
              </a>
            </v-hover>
          </v-container>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import data from '@/services/data/Song'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  computed: {
    playlists() {
      return data ? data.playlist : ''
    }
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>

<style lang="stylus" scoped>
.border
  border-left: 5px solid #000000

.v-card--reveal
  align-items: center
  bottom: 0
  justify-content: center
  opacity: .7
  position: absolute
  width: 100%

.card-image
  border-radius: 5px
</style>
