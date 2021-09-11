<template>
  <div>
    <Profile></Profile>
    <NewsUpdate></NewsUpdate>
    <Activity></Activity>
  </div>
</template>

<script>
import Profile from '@/views/main/aboutjune/Profile'
import NewsUpdate from '@/views/main/aboutjune/NewsUpdate'
import Activity from '@/views/main/aboutjune/Activity'

export default {
  components: {
    Profile,
    NewsUpdate,
    Activity
  }
}
</script>
