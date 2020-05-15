<template>
  <div>
    <div class="header">
      <h2>{{ details.name }} <small>({{ details.symbol }})</small></h2>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          width="18px"
          height="18px"
          @click="closeDetails"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    </div>
    <div class="trade-info">
      <!--
        Trade info includes:
          avgVolume, change ($ amount?), changesPercentage,
          dayHigh, dayLow, earningsAnnouncement, eps, lastDiv,
          marketCap, open, pe, previousClose, price, priceAvg50,
          priceAvg200, range, sharesOutstanding, volume,
          yearHigh, yearLow
       -->
    </div>
    <div class="company-info">
      <label for="company-description">Description</label>
      <p>{{ details.description }}</p>
      <!--
        Company Info includes:
        ceo, exchange, industry, name, sector, symbol, website
       -->
    </div>
    {{ details }}
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      details: state => state.details
    })
  },

  mounted() {
    this.getCompanyInfo(this.details.symbol)
  },

  methods: {
    ...mapActions(['getCompanyInfo']),
    ...mapMutations(['closeDetails'])
  }
}
</script>

<style lang="scss" scoped>
  .header {
    h2 {
      display: inline-block;
      width: 95%;
    }

    svg {
      cursor: pointer;
      display: inline-block;

      &:hover {
        fill: red;
      }
    }
  }
</style>
