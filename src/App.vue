<template>
  <v-app id="app" style="height:auto">
    <template v-if="nolayout">
      <router-view></router-view>
    </template>
    <template v-else>
      <Toolbar></Toolbar>
      <main class="ma-0">
        <Sidebar></Sidebar>
        <Loading v-if="loading"></Loading>
        <router-view v-else style="margin-top: 65px;"></router-view>
      </main>
    </template>
  </v-app>
</template>

<script>
import Toolbar from '@/components/base/Toolbar'
import Sidebar from '@/components/base/Sidebar'
import Loading from '@/components/base/Loading'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    Toolbar,
    Sidebar,
    Loading
  },
  computed: {
    ...mapState('components', {
      loading: state => state.loading
    }),
    nolayout() {
      return this.$route.meta.nolayout
    }
  },
  watch: {
    $route(to, from) {
      this.updateLoading()
    }
  },
  created() {
    this.loading
  },
  methods: {
    ...mapActions('components', ['updateLoading'])
  }
}
</script>

<style lang="stylus">
@import '~vuetify/src/stylus/main'

#app
  background: #ffffff

.application
  font-family: 'Didact Gothic', sans-serif !important

.clickable
  cursor: pointer

.dialog__content
  z-index: 99999 !important

.fade-enter-active, .fade-leave-active
  transition: opacity 1s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0

img.logo
  width: 50px !important

.font-size-10
  font-size: 10px

.font-size-24
  font-size: 24px

.font-size-65
  font-size: 65px

.font-size-112
  font-size: 112px

.text-decoration
  border-bottom: 1.5px solid black
</style>
