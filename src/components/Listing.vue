<template>
  <div>
    <table>
      <tr>
        <th>Stock</th>
        <th>Price</th>
        <th>Time</th>
      </tr>
      <tr
        v-for="stock in stockResponse"
        :key="stock.symbol"
      >
        <td>{{ stock.symbol }}</td>
        <td>${{ stock.price }}</td>
        <td>{{ stock.time }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      stockResponse: [],
      tempStocksArray: 'BILI,AZUL,AMC,IIIV,CNK,GMBL,RCL,TEAM'
    }
  },

  mounted() {
    this.temporaryGetStock()
  },

  methods: {
    async temporaryGetStock() {
      let res = await axios.get(`https://financialmodelingprep.com/api/v3/stock/real-time-price/${this.tempStocksArray}`)
      res.data.companiesPriceList.forEach(stock => {
        let date = new Date()
        stock.time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        this.stockResponse.push(stock)
      })
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
  }
</style>
