<template>
  <div>
    <table>
      <tr>
        <th>Stock</th>
        <th>Price</th>
        <th>Time</th>
      </tr>
      <tr
        v-for="stock in portfolio"
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
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      portfolio: state => state.indexInfo
    })
  },

  mounted() {
    this.getIndexInfo()
  },

  methods: {
    ...mapActions(['getIndexInfo'])
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
