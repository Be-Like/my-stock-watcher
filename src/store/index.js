import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    portfolio: 'BILI,AZUL,AMC,IIIV,CNK,GMBL,RCL,TEAM',
    indexInfo: []
  },
  mutations: {
    addToIndexInfo(state, index) {
      state.indexInfo.push(index)
    }
  },
  actions: {
    async getIndexInfo({ commit, state }) {
      let res = await axios.get(
        `https://financialmodelingprep.com/api/v3/stock/real-time-price/${state.portfolio}`
      )

      res.data.companiesPriceList.forEach(stock => {
        let date = new Date()
        stock.time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        commit('addToIndexInfo', stock)
      })
    }
  },
  modules: {
  }
})
