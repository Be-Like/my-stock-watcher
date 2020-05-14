<template>
  <div>
    <table>
      <tr>
        <th>Stock</th>
        <th>Price</th>
        <th>&#8645;%</th>
        <th>Time</th>
      </tr>
      <tr
        v-for="stock in portfolio"
        :key="stock.symbol"
        class="stock-option"
      >
        <td>{{ stock.symbol }}</td>
        <td>${{ stock.price.toFixed(2) }}</td>
        <td>{{ stock.changesPercentage }} %</td>
        <td>{{ getTime() }}</td>
        <td>
          <div class="dropdown">
            <div class="dropdown-content">
              <p @click="removeStock(stock.symbol)">Delete</p>
            </div>
            <svg
              class="dropdown-button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              width="18px"
              height="18px"
              @click="showDropdown(stock.symbol)"
            >
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </div>
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
      testing: '',
    }
  },

  computed: {
    ...mapState({
      portfolio: state => state.indexInfo,
    })
  },

  mounted() {
    this.getIndexInfo()
  },

  methods: {
    ...mapMutations(['removeFromPortfolio']),
    ...mapActions(['getIndexInfo']),
    getTime() {
      let date = new Date()
      let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
      return `${hour}:${minute}:${second}`
    },
    removeStock(symbol) {
      this.removeFromPortfolio(symbol)
      this.getIndexInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
  table {
    width: 100%;

    th, td {
      text-align: right;

      &:first-child {
        text-align: left;
      }
    }

    tr {
      height: 25px;
    }

    svg {
      visibility: hidden;

      &:hover {
        cursor: pointer;
        fill: green;
      }
    }

    .stock-option:hover svg, svg:hover {
      visibility: visible;
    }
  }

  .dropdown {
    display: inline-block;
    position: relative;

    &:hover .dropdown-content {
      display: block;
    }
  }

  .dropdown-content {
    background-color: #f1f1f1;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    display: none;
    min-width: 80px;
    overflow: auto;
    position: absolute;
    right: 0;
    text-align: left;
    z-index: 1;

    p {
      padding: 0 15px;
      cursor: pointer;
    }
  }
</style>
