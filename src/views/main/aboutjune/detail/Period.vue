<template>
  <div v-if="activity">
    <div>
      <span class="grey--text text--darken-1">by {{ activity.owner }} - </span>
      <v-chip
        class="caption"
        :color="
          expiry_date === activity.detail.period.expiry ? 'grey' : 'coral'
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
import moment from 'moment'

export default {
  props: ['activity'],
  computed: {
    expiry_date() {
      return moment()
        .add(1, 'days')
        .format('dddd DD MMMM YYYY')
    }
  }
}
</script>
