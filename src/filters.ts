import Vue from 'vue'
import _ from 'lodash'
import numeral from 'numeral'
import moment from 'moment'

export default {
  init() {
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
    })
  }
}
