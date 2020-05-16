<template>
  <div class="banner">
    <h2>{{ alert.message }}</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      alert: state => state.alert
    })
  }
}
</script>

<style lang="scss" scoped>
  .banner {
    background-color: green;
    position: absolute;
  }
</style>
