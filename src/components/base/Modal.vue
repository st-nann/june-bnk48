<template>
  <v-card>
    <v-card-title>
      <div class="headline">{{title}}</div>
    </v-card-title>
    <v-card-text class="pb-3 pt-2" v-if="description !== ''">
      <span class="hidden-sm-and-down">{{description}}</span>
    </v-card-text>
    <v-card-text style="height: 480px;">
      <slot name="body"></slot>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="blue--text darken-1" flat @click.native.stop="closeModal">
        {{ button }}
    </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: ['title', 'description', 'button', 'okCallback', 'closeModal', 'danger', 'disable'],
    methods: {
      clickOk: function (event) {
        this.okCallback(event)
      }
    }
  }
</script>
