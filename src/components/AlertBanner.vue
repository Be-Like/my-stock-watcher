<template>
  <div class="banner">
    <p>{{ alert.message }}</p>
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
  template {
    position: absolute;
  }
  .banner {
    background-color: green;
    height: 35px;

    p {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>
