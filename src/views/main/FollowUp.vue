<template>
  <v-container grid-list-md>
    <v-layout row wrap :justify-space-around="$vuetify.breakpoint.lgAndUp">
      <v-flex xs12>
        <v-card>
          <v-layout row wrap>
            <v-flex xs12 sm8 lg10 class="py-0">
              <v-img
                :src="doGetImage(june.image.name, june.image.token)"
                :lazy-src="doGetImage(june.image.name, june.image.token)"
                width="100%"
                height="100%"
              ></v-img>
            </v-flex>
            <v-flex xs12 sm4 lg2 class="text-xs-center">
              <div class="font-weight-bold my-3">
                Follow up
              </div>
              <span
                v-for="(item, index) in june.contact"
                :key="`qrcode-${index}`"
              >
                <QRCode
                  class="mx-1"
                  :data="item"
                  :icon="{
                    name: doMapIcon(item.name).image.name,
                    token: doMapIcon(item.name).image.token
                  }"
                  :size="$vuetify.breakpoint.mdAndDown ? 60 : 100"
                ></QRCode>
                <br v-if="$vuetify.breakpoint.lgAndUp" />
              </span>
              <div
                :class="{
                  'mt-3': $vuetify.breakpoint.mdAndUp,
                  'mt-1': $vuetify.breakpoint.smAndDown
                }"
              >
                <div
                  v-for="(item, index) in june.contact"
                  :key="`link-${index}`"
                >
                  <img
                    :src="
                      doGetImage(
                        doMapIcon(item.name).image.name,
                        doMapIcon(item.name).image.token
                      )
                    "
                    width="20"
                  />
                  <a
                    class="caption black--text"
                    :href="item.link.route"
                    target="_blank"
                    style="vertical-align: super;"
                  >
                    {{ item.link.name }}
                  </a>
                </div>
              </div>
              <v-divider
                :class="{
                  'ma-3': $vuetify.breakpoint.mdAndUp,
                  'ma-1': $vuetify.breakpoint.smAndDown
                }"
              ></v-divider>
              <div class="font-weight-bold caption my-2">- Hashtag -</div>
              <div v-for="(item, index) in june.hashtag" :key="index">
                <a
                  class="caption black--text"
                  :href="item.route"
                  target="_blank"
                  style="vertical-align: super;"
                >
                  # {{ item.name }}
                </a>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 lg4 v-for="(item, index) in groups" :key="index">
        <v-card class="font-thai my-2">
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
            <div
              :style="
                $vuetify.breakpoint.mdAndDown
                  ? 'height: 140px'
                  : 'height: 100px'
              "
            >
              <div v-for="(data, subindex) in item.contact" :key="subindex">
                <img
                  :src="
                    doGetImage(
                      doMapIcon(data.name).image.name,
                      doMapIcon(data.name).image.token
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
            <div class="text-xs-center mt-5 mb-4">
              <QRCode
                :lists="lists"
                :group="item.name"
                :qrcode="qrcode"
                size="130"
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
                <span class="caption">{{ doMapIcon(data.name).name }}</span>
                <img
                  :src="
                    doGetImage(
                      doMapIcon(data.name).image.name,
                      doMapIcon(data.name).image.token
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
        ['Juniversé']: 0,
        ['JUst NÉ - Juné BNK48']: 0
      },
      qrcode: {
        ['ร้านบะหมี่ของจูเน่']: 'Facebook',
        ['Juné Family']: 'Facebook',
        ['Juniversé']: 'Facebook',
        ['JUst NÉ - Juné BNK48']: 'LINE Square (SQ)'
      }
    }
  },
  components: {
    QRCode
  },
  computed: {
    socials() {
      return data ? data.socials : []
    },
    june() {
      return data ? data.june : {}
    },
    groups() {
      return data ? data.groups : []
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
    doMapIcon(name) {
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
