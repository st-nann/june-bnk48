<template>
  <v-layout row wrap>
    <v-flex xs12 md3>
      <div class="border pl-3 mb-3">
        <div
          :class="{
            'font-size-112': $vuetify.breakpoint.lgAndUp,
            'font-size-65 pt-4 mt-3':
              $vuetify.breakpoint.sm || $vuetify.breakpoint.md,
            'font-size-80 pt-3': $vuetify.breakpoint.xs
          }"
          style="line-height: .7"
        >
          Juné's
        </div>
        <div
          :class="{
            'font-size-40':
              $vuetify.breakpoint.xs || $vuetify.breakpoint.lgAndUp,
            'font-size-24': $vuetify.breakpoint.sm || $vuetify.breakpoint.md
          }"
          class="mb-3"
          style="line-height: 2"
        >
          playlist
        </div>
      </div>
    </v-flex>
    <v-flex xs12 md9>
      <v-layout row wrap>
        <v-flex xs12 sm3 v-for="(item, index) in playlists" :key="index">
          <v-container
            fluid
            grid-list-md
            :class="{
              'pa-2': $vuetify.breakpoint.sm || $vuetify.breakpoint.md
            }"
          >
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
                        class="d-flex transition-fast-in-fast-out brown v-card--reveal white--text"
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
  height: 156px

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
