<template>
  <div class="banner-container">
    <div
      class="banner"
      :class="alert.alertType === 'info' ? 'info' : 'danger'"
    >
      <p><b>{{ alert.message }}</b></p>
    </div>
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
  .banner-container {
    background-color: white;
    left: 0;
    position: absolute;
    right: 0;
  }

  .banner {
    height: 35px;

    p {
      padding: 0 10px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .info {
    background-color: #23ce2363;
  }

  .danger {
    background-color: #de181863;
  }
</style>
