<template>
  <qr-canvas :options="options[group]"></qr-canvas>
</template>

<script>
const { QRCanvas } = require('qrcanvas-vue')
import Vue from 'vue'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  props: ['lists', 'group', 'qrcode'],
  data() {
    return {
      options: {},
      filter: []
    }
  },
  components: {
    QrCanvas: QRCanvas
  },
  watch: {
    qrcode: {
      handler() {
        this.doGetOptions()
      },
      deep: true
    }
  },
  created() {
    this.doGetOptions()
  },
  methods: {
    doGetOptions() {
      _.forEach(this.lists, item => {
        if (item.social === this.qrcode[item.group]) {
          this.filter[item.group] = item
        }
      })
      Vue.set(this.options, this.group, {
        size: 180,
        correctLevel: 'M',
        data: this.filter[this.group].link.route
      })
      const image = new Image()
      image.src = this.doGetImage(
        this.filter[this.group].icon.name,
        this.filter[this.group].icon.token
      )
      image.onload = () => {
        this.options[this.group] = Object.assign({}, this.options[this.group], {
          logo: {
            image
          }
        })
      }
    },
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>
