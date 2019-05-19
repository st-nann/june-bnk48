<template>
  <qr-canvas :options="data ? options : options[group]"></qr-canvas>
</template>

<script>
const { QRCanvas } = require('qrcanvas-vue')
import Vue from 'vue'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  props: ['data', 'icon', 'lists', 'group', 'qrcode', 'size'],
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
      if (this.data) {
        this.options.size = this.size
        this.options.correctLevel = 'M'
        this.options.data = this.data.link.route
        this.doAssignData(
          this.icon.name,
          this.icon.token
        )
      } else {
         _.forEach(this.lists, item => {
          if (item.social === this.qrcode[item.group]) {
            this.filter[item.group] = item
          }
        })
         Vue.set(this.options, this.group, {
          size: this.size,
          correctLevel: 'M',
          data: this.filter[this.group].link.route
        })
        this.doAssignData(
          this.filter[this.group].icon.name,
          this.filter[this.group].icon.token
        )
      }
    },
    doAssignData(name, token) {
      const image = new Image()
        image.src = this.doGetImage(name, token)
        image.onload = () => {
          if (this.group) {
            this.options[this.group] = Object.assign({}, this.options[this.group], {
              logo: {
                image
              }
            })
          } else {
            this.options = Object.assign({}, this.options, {
              logo: {
                image
              }
            })
          }
        }
    },
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>
