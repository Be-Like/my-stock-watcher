<template>
  <div>
    <form @submit.prevent="performSearch(phrase)">
      <input
        class="form-group"
        v-model="phrase"
        type="text"
        placeholder="Search for stock"
      >
    </form>
    <table>
      <tr>
        <th>Company</th>
        <th>Symbol</th>
        <th>Price</th>
        <th>Day's %</th>
      </tr>
      <tr
        v-for="stock in results"
        :key="stock.symbol"
        class="stock-option"
      >
        <td>{{ stock.name }}</td>
        <td>{{ stock.symbol }}</td>
        <td>${{ stock.price.toFixed(2) }}</td>
        <td>{{ stock.changesPercentage }} %</td>
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
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      phrase: ''
    }
  },

  computed: {
    ...mapState({
      results: state => state.searchResults
    })
  },

  methods: {
    ...mapActions(['performSearch', 'getIndexInfo']),
    ...mapMutations(['addToPortfolio']),
    addStockToPortfolio(symbol) {
      this.addToPortfolio(symbol)
      this.getIndexInfo()
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
</style>
