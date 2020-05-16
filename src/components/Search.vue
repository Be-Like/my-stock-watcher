<template>
  <div>
    <table>
      <tr>
        <th>Company</th>
        <th>Symbol</th>
        <th>Price</th>
        <th>&#8645;%</th>
      </tr>
      <tr
        v-for="stock in results"
        :key="stock.symbol"
        class="stock-option"
        @click="showDetails(stock)"
      >
        <td>{{ stock.name }}</td>
        <td>{{ stock.symbol }}</td>
        <td :class="stock.changesPercentage >= 0 ? 'positive-return' : 'negative-return'">
          {{ getNumber(stock.price) }}
        </td>
        <td :class="stock.changesPercentage >= 0 ? 'positive-return' : 'negative-return'">
          {{ getNumber(stock.changesPercentage, false) }}
        </td>
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            width="18px"
            height="18px"
            @click="addStockToPortfolio(stock.symbol)"
          >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
          </svg>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { formatNumber } from '../misc/format'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      results: state => state.searchResults
    })
  },

  methods: {
    ...mapActions(['getIndexInfo', 'getCompanyInfo']),
    ...mapMutations(['addToPortfolio', 'openDetails']),
    addStockToPortfolio(symbol) {
      this.addToPortfolio(symbol)
      this.getIndexInfo()
    },
    getNumber(value, isCurrency = true) {
      return isCurrency ?
        `$${formatNumber(value, 2)}` : `${formatNumber(value, 3)} %`
    },
    showDetails(stock) {
      this.getCompanyInfo(stock)
      this.openDetails()
    }
  }
}
</script>

<style lang="scss" scoped>
  table {
    width: 100%;

    th, td {
      text-align: center;
      width: 20%;

      &:first-child {
        width: 40%;
        text-align: left;
      }

      &:nth-last-child(2), &:last-child {
        text-align: right;
      }
    }

    tr {
      // padding: auto 0;
      height: 30px;
      vertical-align: center;
    }

    svg {

      &:hover {
        cursor: pointer;
        fill: green;
      }
      visibility: hidden;
    }

    .stock-option:hover svg, svg:hover {
      visibility: visible;
    }
  }

  .stock-option {
    cursor: pointer;
  }

  .positive-return {
    color: #0bce1c;
  }

  .negative-return {
    color: red;
  }
</style>
