<template>
  <v-toolbar class="white elevation-5" fixed light>
    <v-toolbar-side-icon
      class="black--text"
      @click.native.stop="updateToggleSidebar()"
    ></v-toolbar-side-icon>
    <v-spacer class="hidden-sm-and-up"></v-spacer>
    <v-toolbar-title class="ml-0">
      <a href="/">
        <img class="mt-2 logo" :src="logo" />
      </a>
    </v-toolbar-title>
    <v-divider class="ml-3 mr-3 hidden-xs-only" inset vertical></v-divider>
    <span class="headline font-weight-bold hidden-xs-only">Juné BNK48</span>
    <v-spacer class="hidden-xs-only"></v-spacer>
    <v-toolbar-items v-for="(item, index) in menu" :key="index">
      <v-btn
        class="menu font-weight-bold hidden-md-and-down"
        append
        :to="{ path: item.route }"
        color="black"
        :ripple="false"
        flat
      >
        <span :class="{ 'text-decoration': $route.path === item.route }">
          {{ item.name }}
        </span>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex'
import data from '@/services/data/Base'

export default {
  data() {
    return {
      menu: data.menu
    }
  },
  computed: {
    logo() {
      return process.env.VUE_APP_FAVICON ? process.env.VUE_APP_FAVICON : ''
    }
  },
  methods: {
    ...mapActions('components', ['updateToggleSidebar'])
  }
}
</script>

<style lang="stylus">
.menu.v-btn--active:before,
.menu.v-btn:hover:before,
.menu.v-btn:focus:before
  background-color: transparent
</style>
