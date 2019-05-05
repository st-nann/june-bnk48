<template>
  <v-navigation-drawer
    :value="toggle_sidebar"
    height="100%"
    persistent
    absolute
    temporary
    clipped
    enable-resize-watcher
  >
    <v-layout row wrap class="text-xs-center mx-3">
      <v-flex xs12 class="pt-4">
        <v-avatar class="elevation-7 avatar" color="offwhite" size="150">
          <img :src="logo" alt="avatar" />
        </v-avatar>
      </v-flex>
      <v-flex xs12 class="pt-3 font-weight-bold subheading">
        Sanyanee Thawinvongrak
      </v-flex>
      <v-flex xs12 class="font-weigh-medium grey--text text--darken-3 caption">
        ネン・サンヤーネィ・タビンボンラック
      </v-flex>
      <v-flex
        xs12
        class="font-size-10 font-weigh-thin grey--text text--darken-1 caption"
      >
        st.sanyanee@hotmail.com
      </v-flex>
      <v-flex xs12 class="pt-2">
        <v-btn
          color="cinnamon"
          @click.native="updateToggleSidebar('home')"
          :to="{ path: '/' }"
          append
          round
          outline
          small
        >
          Home
        </v-btn>
      </v-flex>
      <v-flex xs12 class="pa-3">
        <v-divider></v-divider>
      </v-flex>
    </v-layout>
    <v-list dense class="hidden-lg-and-up">
      <v-list-tile
        v-for="(item, index) in menu"
        :key="index"
        :to="{ path: item.route }"
        append
      >
        <v-list-tile-content class="mx-5">
          <v-list-tile-title class="grey--text text--darken-1">
            <v-icon
              class="pr-1"
              :class="{
                'font-weight-bold darkblue--text': item.route === $route.path
              }"
              color="grey"
              size="17"
            >
              mdi-{{ item.icon }}
            </v-icon>
            <span
              :class="{
                'font-weight-bold darkblue--text': item.route === $route.path
              }"
            >
              {{ item.name }}
            </span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-layout row wrap justify-space-around class="pa-4">
      <v-flex xs11>
        <v-layout row wrap>
          <v-flex xs4 v-for="(item, index) in images" :key="index">
            <img
              :src="doGetImage(item.name, item.token)"
              width="74"
              :height="toggle_sidebar ? '97%' : ''"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="text-xs-center mx-3">
      <v-flex xs12 class="font-size-10 grey--text">
        <div>
          Portfolio website v2.0.0
        </div>
        <div>
          <span class="caption">&copy;</span>
          {{ new Date().getFullYear() }} Sanyanee Thawinvongrak
        </div>
      </v-flex>
    </v-layout>
  </v-navigation-drawer>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import data from '@/services/data/Base'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  data() {
    return {
      menu: data.menu,
      images: data.img_sidebar
    }
  },
  computed: {
    ...mapState('components', {
      toggle_sidebar: state => state.toggle_sidebar
    }),
    logo() {
      return process.env.VUE_APP_LOGO_NOTEXT_BLACK
        ? process.env.VUE_APP_LOGO_NOTEXT_BLACK
        : ''
    }
  },
  methods: {
    ...mapActions('components', ['updateToggleSidebar']),
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>

<style lang="stylus">
.avatar.v-avatar img
    border-radius: unset
    height: 95px
    width: 95px
</style>
