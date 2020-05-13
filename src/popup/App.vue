<template>
  <div>
    <robinhood-header />
    <listing />
    <search />
  </div>
</template>

<script>
import RobinhoodHeader from '@/components/RobinhoodHeader.vue'
import Listing from '@/components/Listing.vue'
import Search from '@/components/Search.vue'

export default {
  name: 'App',
  components: {
    RobinhoodHeader,
    Listing,
    Search
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
