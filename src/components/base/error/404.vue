<template>
    <v-layout row wrap>
        <v-flex xs10 offset-xs1 class="my-5">
            <v-card class="text-xs-left pa-5 card-position">
               <v-layout row wrap class="mt-5 outside-layout">
                   <v-flex xs12 order-xs2 md6 order-md1 class="mt-5 text-xs-center">
                       <!-- <img class="mt-5 pt-4 image-size" src="~@/img/icon/Error404.svg" width="500px"/> -->
                   </v-flex>
                   <v-flex xs12 order-xs1 md6 order-md2>
                       <v-card-text class="text-position display-1 grey--text text--darken-2 pb-0"><b>Oops !</b></v-card-text>
                       <v-card-text class="title grey--text text--darken-2 pt-3 pb-0">You have some problems.</v-card-text>
                       <v-card-text class="body-2 grey--text text--darken-1 pt-1">The page you are looking for was moved, removed, renamed or might never existed.</v-card-text>
                       <a href="/" style="text-decoration:none;">
                           <v-btn class="ml-3 light-blue--text text--darken-3" outline>Go back</v-btn>
                       </a>
                   </v-flex>
               </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<style lang="stylus" scoped>
  @media only screen and (max-width: 1024px)
    .image-size
      width: 350px !important
      margin-top: 0px !important
      margin-bottom: 20px !important
      padding-top: 0px !important

  @media only screen and (max-width: 414px)
    .image-size
      width: 230px !important
      margin-top: 0px !important
      margin-bottom: 20px !important
      padding-top: 0px !important

    .card-position
      padding: 20px !important

    .text-position
      padding-top: 0px !important

    .outside-layout
      margin-top: 20px !important
</style>
