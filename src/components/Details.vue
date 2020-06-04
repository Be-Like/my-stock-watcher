<template>
  <div>
    <div class="header">
      <h2>{{ details.description }} <small>({{ details.symbol }})</small></h2>
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
    <div class="row">
      <div class="thirds">
        <p><b>Price</b></p>
        <p>{{ currency(details.ask) }}</p>
      </div>
      <div class="thirds">
        <p><b>&#8645;$</b></p>
        <p>{{ currency(details.change) }}</p>
      </div>
      <div class="thirds">
        <p><b>&#8645;%</b></p>
        <p>{{ percentage(details.change_percentage) }}</p>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <div class="stat">
          <p><b>High</b></p>
          <p>{{ currency(details.high) }}</p>
        </div>
        <div class="stat">
          <p><b>Low</b></p>
          <p>{{ currency(details.low) }}</p>
        </div>
        <div class="stat">
          <p><b>Open</b></p>
          <p>{{ currency(details.open) }}</p>
        </div>
        <div class="stat">
          <p><b>Prev Close</b></p>
          <p>{{ currency(details.prevclose) }}</p>
        </div>
        <!-- <div class="stat">
          <p><b>Dividends</b></p>
          <p>{{ percentage(details.dividend) }}</p>
        </div> -->
        <!-- <div class="stat">
          <p><b>Range</b></p>
          <p>{{ convertRange(details.range) }}</p>
        </div> -->
        <!-- <div class="stat">
          <p><b>Price 50</b></p>
          <p>{{ currency(details.priceAvg50) }}</p>
        </div> -->
      </div>
      <div class="column">
        <div class="stat">
          <p><b>Volume</b></p>
          <p>{{ wholeNumber(details.volume) }}</p>
        </div>
        <div class="stat">
          <p><b>Avg Volume</b></p>
          <p>{{ wholeNumber(details.average_volume) }}</p>
        </div>
        <!-- <div class="stat">
          <p><b>Market Cap</b></p>
          <p>{{ currency(details.marketCap) }}</p>
        </div> -->
        <!-- <div class="stat">
          <p><b>EPS</b></p>
          <p>{{ percentage(details.eps) }}</p>
        </div> -->
        <!-- <div class="stat">
          <p><b>P/E</b></p>
          <p>{{ percentage(details.pe) }}</p>
        </div> -->
        <div class="stat">
          <p><b>Year High</b></p>
          <p>{{ currency(details.week_52_high) }}</p>
        </div>
        <div class="stat">
          <p><b>Year Low</b></p>
          <p>{{ currency(details.week_52_low) }}</p>
        </div>
        <!-- <div class="stat">
          <p><b>CSO</b></p>
          <p>{{ wholeNumber(details.sharesOutstanding) }}</p>
        </div> -->
        <!-- <div class="stat">
          <p><b>Price 200</b></p>
          <p>{{ currency(details.priceAvg200) }}</p>
        </div> -->
      </div>
      <!-- <div class="column">
        <p class="earnings"><b>Earnings Announcement</b></p>
      </div>
      <div class="column">
        <p class="earnings">{{ getDate(details.earningsAnnouncement) }}</p>
      </div>
    </div> -->
    <!-- <div class="company-info">
      <p><b>Description</b></p>
      <p>{{ details.description }}</p>
      <p><b>CEO</b></p>
      <p>{{ details.ceo }}</p>

      <div class="row">
        <div class="column">
          <p><b>Industry</b></p>
          <p>{{ details.industry }}</p>
          <p><b>Exchange</b></p>
          <p>{{ details.exhange }}</p>
          <p><b>Company Name</b></p>
          <p>{{ details.name }}</p>
        </div>
        <div class="column">
          <p><b>Sector</b></p>
          <p>{{ details.sector }}</p>
          <p><b>Website</b></p>
          <a :href="details.website" target="_blank">{{ details.website }}</a>
          <p><b>Symbol</b></p>
          <p>{{ details.symbol }}</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { formatNumber, formatDate } from '../misc/format'
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      details: state => state.details
    })
  },

  methods: {
    ...mapMutations(['closeDetails', 'getCompanyInfo']),
    currency(value) {
      return '$' + formatNumber(value, 2)
    },
    convertRange(value) {
      let values = []
      value.split('-').forEach(number => {values.push(this.currency(number))})
      return values.join('-')
    },
    percentage(value) {
      return formatNumber(value, 3) + ' %'
    },
    wholeNumber(value) {
      return formatNumber(value)
    },
    getDate(date) {
      return formatDate(date)
    }
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

  .row {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
  }

  .thirds {
    display: inline-block;
    text-align: center;
    width: 33.333%;
  }

  .column {
    display: inline-block;
    width: 50%;
  }

  .stat {
    padding: 0 10px;

    p {
      display: inline-block;
      margin-top: 0;
      width: 50%;

      &:nth-child(even) {
        text-align: right;
      }
    }
  }

  .earnings, .company-info {
    padding: 0 10px;
  }

  a, a:visited {
    color: #0badd8;
    text-decoration: none;
  }
</style>
