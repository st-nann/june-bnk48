<template>
  <v-card>
    <v-card-title v-if="!hide_action">
      <div class="headline">{{ title }}</div>
    </v-card-title>
    <v-card-text class="pb-3 pt-2" v-if="description !== '' && !hide_action">
      <span class="hidden-sm-and-down">{{ description }}</span>
    </v-card-text>
    <v-card-text v-if="body">
      <v-layout
        v-if="loading"
        align-center
        justify-center
        fill-height
        tag="v-card-text"
        style="height: 650px;"
      >
        <v-progress-circular
          indeterminate
          :width="3"
          :size="40"
          color="yellow"
        ></v-progress-circular>
      </v-layout>
      <slot name="body" v-else></slot>
    </v-card-text>
    <v-card-actions v-if="!hide_action">
      <v-spacer></v-spacer>
      <v-btn
        class="orange--text font-weight-bold"
        @click.native.stop="closeModal"
        flat
      >
        {{ button }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: [
    'open',
    'body',
    'title',
    'description',
    'button',
    'okCallback',
    'closeModal',
    'danger',
    'disable',
    'hide_action'
  ],
  computed: {
    ...mapState('components', {
      loading: state => state.modal_loading
    })
  },
  watch: {
    open() {
      if (this.open) {
        this.updateLoading(true)
      }
    }
  },
  methods: {
    ...mapActions('components', ['updateLoading']),
    clickOk(event) {
      this.okCallback(event)
    }
  }
}
</script>
