<template>
  <v-container grid-list-md>
    <v-layout row wrap justify-space-around>
      <v-flex xs4 v-for="(item, index) in groups" :key="index">
        <v-card class="font-thai">
          <v-card-text>
            <v-avatar class="mr-3 elevation-5" :size="60">
              <img
                :src="doGetImage(item.image.name, item.image.token)"
                width="100%"
              />
            </v-avatar>
            <span
              class="font-weight-bold font-size-24"
              style="vertical-align: middle;"
            >
              {{ item.name }}
            </span>
          </v-card-text>
          <v-card-text class="px-5">
            <div style="height: 130px">
              <div v-for="(data, subindex) in item.contact" :key="subindex">
                <img
                  :src="
                    doGetImage(
                      doMapImage(data.name).image.name,
                      doMapImage(data.name).image.token
                    )
                  "
                  width="20"
                  class="mr-2"
                />
                <a
                  class="caption black--text"
                  :href="data.link.route"
                  target="_blank"
                  style="vertical-align: super;"
                >
                  {{ data.link.name }}
                </a>
              </div>
            </div>
            <div class="text-xs-center my-5">
              <QRCode
                :lists="lists"
                :group="item.name"
                :qrcode="qrcode"
              ></QRCode>
            </div>
          </v-card-text>
          <v-card-text>
            <v-bottom-nav
              :active.sync="bottomNav[item.name]"
              color="white"
              :value="true"
              absolute
              shift
            >
              <v-btn
                v-for="(data, subindex) in item.contact"
                :key="subindex"
                @click="doGetDataQRCode(item.name, data.name)"
              >
                <span class="caption">{{ doMapImage(data.name).name }}</span>
                <img
                  :src="
                    doGetImage(
                      doMapImage(data.name).image.name,
                      doMapImage(data.name).image.token
                    )
                  "
                  width="25"
                />
              </v-btn>
            </v-bottom-nav>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import data from '@/services/data/FollowUp'
import { getImageFromStore } from '@/services/functions/Services'
import QRCode from '@/components/QRCode'

export default {
  data() {
    return {
      lists: [],
      bottomNav: {
        ['ร้านบะหมี่ของจูเน่']: 0,
        ['Juné Family']: 0,
        ['Juniversé']: 0
      },
      qrcode: {
        ['ร้านบะหมี่ของจูเน่']: 'Facebook',
        ['Juné Family']: 'Facebook',
        ['Juniversé']: 'Facebook'
      }
    }
  },
  components: {
    QRCode
  },
  computed: {
    groups() {
      return data ? data.groups : []
    },
    socials() {
      return data ? data.socials : []
    }
  },
  created() {
    this.doMapData()
  },
  methods: {
    doMapData() {
      _.forEach(this.groups, item => {
        _.forEach(item.contact, data => {
          let icon = _.find(this.socials, { name: data.name })
          this.lists.push({
            group: item.name,
            social: data.name,
            link: {
              name: data.link.name,
              route: data.link.route
            },
            icon: {
              name: icon.image.name,
              token: icon.image.token
            }
          })
        })
      })
    },
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    },
    doMapImage(name) {
      return _.find(this.socials, item => {
        return item.name === name
      })
    },
    doGetDataQRCode(group, social) {
      this.qrcode[group] = social
    }
  }
}
</script>

<style lang="stylus" scoped></style>
