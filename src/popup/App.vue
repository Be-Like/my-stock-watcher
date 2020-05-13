<template>
  <div>
    <robinhood-header />
    <listing />
  </div>
</template>

<script>
import RobinhoodHeader from '@/components/RobinhoodHeader.vue'
import Listing from '@/components/Listing.vue'

export default {
  name: 'App',
  components: {
    RobinhoodHeader,
    Listing
  }
}
</script>

<style>
html {
  width: 400px;
  height: 400px;
}
</style>
