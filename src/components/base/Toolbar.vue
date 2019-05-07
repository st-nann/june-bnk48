<template>
  <v-toolbar class="offwhite py-1" fixed flat light>
    <v-toolbar-title class="ml-0">
      <a href="/">
        <img class="mt-2 logo" :src="logo" />
      </a>
    </v-toolbar-title>
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
    <v-spacer></v-spacer>
    <v-toolbar-side-icon
      class="black--text"
      @click.native.stop="updateToggleSidebar()"
    ></v-toolbar-side-icon>
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
      return process.env.VUE_APP_LOGO_TRANSPARENT
        ? process.env.VUE_APP_LOGO_TRANSPARENT
        : ''
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
