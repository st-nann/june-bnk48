<template>
  <v-layout row wrap>
    <v-flex xs12>
      <img :src="doGetImage(cover.name, cover.token)" width="100%" />
    </v-flex>
    <v-flex xs12>
      <v-container grid-list-md>
        <v-layout
          row
          wrap
          v-for="(item, index) in Object.keys(products)"
          :key="index"
          class="mb-4"
        >
          <v-flex xs12>
            <div class="font-size-24 font-weight-bold">
              | {{ doCovertText(item) }}
            </div>
          </v-flex>
          <v-flex
            xs12
            sm4
            lg3
            v-for="(data, subindex) in products[item].orders"
            :key="subindex"
          >
            <v-card ripple :href="data.route" target="_blank" height="100%">
              <v-img
                :src="doGetImage(data.image.name, data.image.token)"
                :lazy-src="doGetImage(data.image.name, data.image.token)"
              >
                <div
                  v-if="doCheckOutOfStock(data.date.end)"
                  class="out-of-stock d-flex text-xs-center font-weight-bold subheading"
                >
                  Out of stock
                </div>
              </v-img>
              <v-divider></v-divider>
              <v-card-text class="pa-2">
                <v-layout row wrap class="caption font-thai px-1">
                  <v-flex xs8>
                    <div class="font-weight-bold">{{ data.name }}</div>
                    <div>start: {{ data.date.start | date }}</div>
                    <div>until: {{ data.date.end | date }}</div>
                  </v-flex>
                  <v-flex xs4 class="font-weight-bold text-xs-right">
                    {{ data.price | currency }}
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment'
import data from '@/services/data/Shop'
import {
  getImageFromStore,
  checkExpireDate
} from '@/services/functions/Services'

export default {
  computed: {
    cover() {
      return data ? data.cover : {}
    },
    products() {
      return data
        ? _.forEach(data.products, (item, index) => {
            data.products[index].orders = _.orderBy(
              item.orders,
              ['date.end', 'date.start'],
              ['desc', 'asc']
            )
          })
        : {}
    }
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    },
    doCovertText(text) {
      return _.capitalize(text)
    },
    doCheckOutOfStock(until) {
      return checkExpireDate(until)
    }
  }
}
</script>

<style lang="stylus">
.out-of-stock
  align-items: center
  bottom: 0
  justify-content: center
  opacity: .8
  position: absolute
  height: 100%
  width: 100%;
  background-color: #d0d4d4
</style>
