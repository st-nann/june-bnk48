<template>
  <!-- <v-img
    :src="doGetImage(background.image.name, background.image.token)"
    :lazy-src="doGetImage(background.image.name, background.image.token)"
    width="100%"
    height="100%"
  > -->
    <v-container class="px-0">
      <v-layout row wrap justify-center justify-space-between class="my-2">
        <v-flex xs12 class="text-xs-center">
          <div class="font-size-30 font-weight-bold mb-2"> NEWS UPDATE </div>
        </v-flex>
        <v-flex xs2 offset-xs5 class="mb-4">
          <v-divider class="title-line mx-5"></v-divider>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs9>
              <v-img
                :src="doGetImage(newsupdate.instagram.image.name, newsupdate.instagram.image.token)"
                :lazy-src="doGetImage(newsupdate.instagram.image.name, newsupdate.instagram.image.token)"
                width="100%"
              ></v-img>
            </v-flex>
            <v-flex xs3>
              <v-card
                class="elfsight-app-8c851844-0af8-42f1-b7a3-3f95cccb5829"
                style="height: 460px;"
              ></v-card>
            </v-flex>
          </v-layout>
        </v-flex>
            <!-- <v-flex xs4>
              <v-card flat tile>
                <v-window v-model="onboarding">
                  <v-window-item
                    v-for="(item, index) in announcements"
                    :key="index"
                  >
                    <v-img
                      class="elevation-8"
                      :src="doGetImage(item.image.name, item.image.token)"
                      :lazy-src="doGetImage(item.image.name, item.image.token)"
                      width="100%"
                    ></v-img>
                  </v-window-item>
                </v-window>
                <v-card-actions>
                  <v-layout row wrap>
                    <v-flex xs12 class="text-xs-center">
                      <v-item-group
                        v-model="onboarding"
                        mandatory
                      >
                        <v-item
                          v-for="(item, index) in announcements.length"
                          :key="index"
                        >
                          <v-icon
                            slot-scope="{ active, toggle }"
                            :input-value="active"
                            @click="toggle"
                            size="18"
                            :color="onboarding === index ? 'brown' : 'grey lighten-2'"
                          >
                            mdi-record
                          </v-icon>
                        </v-item>
                      </v-item-group>
                    </v-flex>
                  </v-layout>
                </v-card-actions>
              </v-card>
            </v-flex> -->
            <!-- <v-flex xs4 class="text-xs-right">
              <iframe
                class="elevation-8"
                :src="newsupdate.facebook.src"
                width="320"
                height="460"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowTransparency="true"
                allow="encrypted-media"
              ></iframe>
            </v-flex> -->
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  <!-- </v-img> -->
</template>

<script>
import data from '@/services/data/aboutjune/NewsUpdate'
import { getImageFromStore } from '@/services/functions/Services'

export default {
  data() {
    return {
      onboarding: 0
    }
  },
  computed: {
    background() {
      return data ? data.background : {}
    },
    announcements() {
      return data ? data.announcements : []
    },
    newsupdate() {
      return data ? data.newsupdate : {}
    }
  },
  created() {
    let script = document.createElement('script')
    script.setAttribute('src',"https://apps.elfsight.com/p/platform.js")
    document.head.appendChild(script)
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    }
  }
}
</script>

<style lang="stylus">
.title-line
  border: 1.5px solid #000000
  border-color: #000000 !important
  border-radius: 50px
</style>
