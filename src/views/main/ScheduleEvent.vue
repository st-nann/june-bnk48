<template>
  <v-layout
    row
    wrap
    :class="{
      'pa-3': $vuetify.breakpoint.xs,
      'pa-5': $vuetify.breakpoint.smAndUp
    }"
  >
    <v-flex xs12 lg7>
      <v-card color="brown" flat>
        <v-card-text>
          <v-layout row wrap class="white--text">
            <v-flex xs3>
              <v-icon @click="$refs.calendar.prev()" color="white">
                mdi-chevron-left
              </v-icon>
            </v-flex>
            <v-flex x6 class="pt-1 text-xs-center font-weight-bold title">
              {{ (calendar + ' fullmonth') | date }}
            </v-flex>
            <v-flex xs3 class="text-xs-right">
              <v-icon @click="$refs.calendar.next()" color="white">
                mdi-chevron-right
              </v-icon>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-sheet
          :height="$vuetify.breakpoint.xs ? 450 : 500"
          :class="{ 'mb-3': $vuetify.breakpoint.mdAndDown }"
        >
          <v-calendar
            ref="calendar"
            v-model="calendar"
            :now="today"
            :value="today"
            color="brown"
            class="elevation-3"
          >
            <template v-slot:day="{ date }">
              <div
                v-if="eventsMap[date]"
                v-ripple
                @click="doGetDetailEvent(date)"
                class="brown--text text-xs-center pt-2 clickable"
              >
                <img
                  :src="
                    doGetImage(
                      'schedule%2Fsalmon',
                      '4a5863b6-9f4f-48b3-a187-dc26773955e6'
                    )
                  "
                  width="40%"
                />
              </div>
            </template>
          </v-calendar>
        </v-sheet>
      </v-card>
    </v-flex>
    <v-flex
      xs12
      lg5
      class="font-thai"
      :class="{ 'pl-3': $vuetify.breakpoint.lgAndUp }"
    >
      <v-card
        :class="{
          'pa-1': $vuetify.breakpoint.xs,
          'pa-3': $vuetify.breakpoint.smAndUp
        }"
        color="grey lighten-4"
        height="100%"
        flat
      >
        <v-card-title class="subheading font-weight-bold">
          {{ (date + ' fulldate') | date }}
        </v-card-title>
        <div v-if="details.length > 0">
          <v-card-text
            v-for="(item, index) in details"
            :key="index"
            class="py-0"
          >
            <v-timeline align-top dense>
              <v-timeline-item :color="item.details.color">
                <template v-slot:icon>
                  <v-icon size="18" color="white">
                    mdi-{{ item.details.icon }}
                  </v-icon>
                </template>
                <v-layout row wrap class="white pa-3 elevation-5">
                  <v-flex xs12 sm4>
                    <strong>
                      <v-icon
                        size="15"
                        color="grey darken-2"
                        style="vertical-align: middle;"
                      >
                        mdi-clock-outline
                      </v-icon>
                      {{ item.details.time }}
                    </strong>
                  </v-flex>
                  <v-flex xs12 sm8>
                    <strong>{{ item.title }}</strong>
                    <div class="caption">{{ item.details.description }}</div>
                    <a
                      v-if="item.details.link !== ''"
                      target="_blank"
                      :href="item.details.link"
                    >
                      click link
                    </a>
                    <div v-if="item.details.location !== ''">
                      <v-icon size="18" style="vertical-align: sub;">
                        mdi-map-marker-radius
                      </v-icon>
                      {{ item.details.location }}
                    </div>
                  </v-flex>
                </v-layout>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </div>
        <v-layout v-else row wrap class="text-xs-center py-5">
          <v-flex xs12 class="subheading py-5">
            no event
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import data from '@/services/data/ScheduleEvent'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  data() {
    return {
      calendar: '',
      date: '',
      details: []
    }
  },
  computed: {
    today() {
      return moment().format('YYYY-MM-DD')
    },
    events() {
      return data ? data.schedule_event : []
    },
    eventsMap() {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  created() {
    this.calendar = this.today
    this.date = this.today
    this.doGetDetailEvent(this.today)
  },
  methods: {
    doGetDetailEvent(date) {
      this.date = date
      this.details = _.filter(this.events, { date: date })
    },
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>
