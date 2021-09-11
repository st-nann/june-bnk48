import Vue from 'vue'
import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'

export default {
  init() {
    Vue.filter('date', function(value) {
      let split = _.split(value, ' ')
      if (split.length > 1) {
        switch (split[1]) {
          case 'fulldate':
            return moment(split[0]).format('dddd DD MMMM YYYY')
          case 'fullmonth':
            return moment(split[0]).format('MMMM YYYY')
          default:
            return value
        }
      } else {
        switch (typeof value) {
          case 'number':
            return moment.unix(value).format('dddd DD MMMM YYYY')
          default:
            return value
        }
      }
    }),
      Vue.filter('validate', function(value) {
        switch (value) {
          case '':
            return '-'
          case null:
            return '-'
          case undefined:
            return '-'
          default:
            return value
        }
      }),
      Vue.filter('currency', function(price) {
        return `฿ ${numeral(price).format('0,0.00')}`
      })
  }
}
