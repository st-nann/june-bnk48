<template>
  <v-layout row wrap>
    <v-flex xs12>
      <img :src="doGetImage(cover.name, cover.token)" width="100%" />
    </v-flex>
    <v-flex xs12 class="mt-3">
      <v-tabs
        v-model="tab"
        class="gallery darkbrown--text"
        color="transparent"
        slider-color="darkbrown"
        centered
        fixed-tabs
      >
        <v-tab
          v-for="(item, index) in tabs"
          :key="index"
          :href="`#${item.value}`"
        >
          {{ item.name }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="(item, index) in tabs"
            :key="index"
          :value="`${item.value}`"
        >
          <v-card flat>
            <v-card-text>
              <v-layout v-if="!isArry" row wrap>
                <v-spacer></v-spacer>
                <v-flex xs3>
                  <v-select
                    v-model="topic"
                    :items="menu"
                    item-text="name"
                    item-value="value"
                    prepend-inner-icon="mdi-calendar-check"
                    :menu-props="{ closeOnContentClick: true, overflowY: true }"
                    background-color="brown"
                    solo
                    flat
                    dense
                    hide-details
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-list-tile class="pa-1">
                        <v-list-tile-content v-if="menu.length > 0" class="font-thai white--text">
                          <v-list-tile-title
                            class="font-weight-bold"
                            v-html="item.name"
                          ></v-list-tile-title>
                          <v-list-tile-sub-title>
                            {{ item.date }} - {{ item.place }}
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                    <template v-slot:item="{ item, index }">
                      <v-list-tile :key="item.value" class="pa-1">
                        <v-list-tile-content v-if="menu.length > 0" class="font-thai">
                          <v-list-tile-title
                            class="font-weight-regular"
                            v-html="item.name"
                          ></v-list-tile-title>
                          <v-list-tile-sub-title>
                            {{ item.date }} - {{ item.place }}
                          </v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-content v-else>
                          <v-layout
                            align-center
                            justify-center
                            fill-height
                            tag="v-card-text"
                            style="height: 650px;"
                          >
                            <v-progress-circular
                              indeterminate
                              :width="3"
                              :size="40"
                              color="yellow"
                            ></v-progress-circular>
                          </v-layout>
                        </v-list-tile-content>
                      </v-list-tile>
                    </template>
                  </v-select>
                </v-flex>
              </v-layout>
              <GalleryList :image_lists="image_lists"></GalleryList>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-flex>
  </v-layout>
</template>

<script>
import data from '@/services/data/Gallery'
import { getImageFromStore, convertName } from '@/services/functions/Services'
import GalleryList from '@/views/main/gallery/List'

export default {
  data() {
    return {
      tab: 'photoset',
      image_lists: [],
      menu: [],
      topic: ''
    }
  },
  components: {
    GalleryList
  },
  computed: {
    cover() {
      return data ? data.cover : {}
    },
    tabs() {
      return data ? data.tabs : []
    },
    isArry() {
      return _.isArray(this.image_lists)
    }
  },
  watch: {
    tab() {
      this.doGetDetail(this.tab)
    }
  },
  created() {
    this.doGetDetail(this.tab)
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    },
    doGetDetail(name) {
      let key = convertName(name)
      let detail = () => import(`@/services/data/gallery/${key}`)
      detail().then(res => {
        let response = res[name] ? res[name] : []
        if (_.isArray(response)) {
          this.image_lists = response
        } else {
          this.doGetMenu(key)
          this.image_lists = response[this.topic]
        }
      })
    },
    doGetMenu(name) {
      let menu = () => import(`@/services/data/gallery/${name}Menu`)
      menu().then(res => {
        this.menu = res.menu
        this.topic = this.menu[0].value
      })
    }
  }
}
</script>

<style lang="stylus" scoped></style>
