<template>
  <div>
    <v-layout row wrap class="px-5 py-4">
      <v-flex xs12>
        <div class="title">Category</div>
      </v-flex>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs12 sm3 v-for="(item, index) in category" :key="index">
            <v-container
              fluid
              grid-list-md
              :class="{
                'pa-2': $vuetify.breakpoint.sm || $vuetify.breakpoint.md
              }"
            >
              <v-hover class="clickable">
                <v-card
                  slot-scope="{ hover }"
                  class="card-image mx-auto"
                  :class="`elevation-${hover ? 20 : 1}`"
                  @click="doGetCategoryLists(item)"
                >
                  <v-img
                    :src="doGetImage(item.image.name, item.image.token)"
                    width="100%"
                  >
                    <v-container
                      fill-height
                      fluid
                      :py-1="$vuetify.breakpoint.lgAndUp"
                      :py-0="$vuetify.breakpoint.mdAndDown"
                      px-2
                    >
                      <v-layout fill-height>
                        <v-flex
                          xs12
                          align-end
                          flexbox
                          class="text-xs-right font-thai"
                        >
                          <span
                            class="white--text bg-color"
                            :class="{
                              'font-size-20': $vuetify.breakpoint.lgAndUp,
                              subheading: $vuetify.breakpoint.mdAndDown
                            }"
                            v-text="item.name"
                          ></span>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-img>
                </v-card>
              </v-hover>
            </v-container>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <Detail
      :modal="modal"
      :group="group"
      :media="media"
      v-on:closeModal="eventChildCloseModal"
    ></Detail>
  </div>
</template>

<script>
import data from '@/services/data/Performance'
import { getImageFromStore, convertName } from '@/services/functions/Services'
import Detail from '@/views/main/performance/Detail'

export default {
  data() {
    return {
      group: {},
      modal: false,
      media: []
    }
  },
  components: {
    Detail
  },
  computed: {
    category() {
      return data ? data.category : ''
    }
  },
  methods: {
    doGetImage(name, token) {
      return getImageFromStore(name, token)
    },
    doGetCategoryLists(group) {
      let key = convertName(group.name)
      this.group = group
      this.data = () => import(`@/services/data/performance/${key}`)
      this.data().then(res => {
        this.media = res[group.key] ? res[group.key] : []
      })
      this.modal = true
    },
    eventChildCloseModal(close) {
      this.modal = close
    }
  }
}
</script>

<style lang="stylus" scoped>
.card-image
  border-radius: 5px

.bg-color
  background-color: #ccaa76
  opacity: .9
  border-radius: 50px
  padding: 1px 15px
</style>
