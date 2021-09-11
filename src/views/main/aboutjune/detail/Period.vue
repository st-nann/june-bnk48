<template>
  <div v-if="activity">
    <div>
      <span class="grey--text text--darken-1">by {{ activity.owner }} - </span>
      <v-chip
        class="caption"
        :color="
          doCheckOutOfStock(activity.detail.period.expiry) ? 'grey' : 'coral'
        "
        text-color="white"
        small
        style="vertical-align: inherit; height: 21px!important;"
      >
        available
      </v-chip>
    </div>
    <div>
      <span class="font-weight-bold">Start date</span>
      <span> {{ activity.detail.period.start | date }}</span>
    </div>
    <div>
      <span class="font-weight-bold">Expiry date</span>
      <span> {{ activity.detail.period.expiry | date }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { checkExpireDate } from '@/services/functions/Services'

export default {
  props: ['activity'],
  methods: {
    ...mapActions('components', ['updateIsExpire']),
    doCheckOutOfStock(until) {
      this.updateIsExpire(checkExpireDate(until))
      return checkExpireDate(until)
    }
  }
}
</script>
