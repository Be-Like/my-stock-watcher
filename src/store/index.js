import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    portfolio: 'BILI,AZUL,AMC,IIIV,CNK,GMBL,RCL,TEAM,',
    indexInfo: [],
    searchResults: []
  },
  mutations: {
    addToIndexInfo(state, index) {
      state.indexInfo.push(index)
    },
    addToPortfolio(state, symbol) {
      state.portfolio += (symbol + ',')
    }
  },
  actions: {
    async getIndexInfo({ commit, state }) {
      let res = await axios.get(
        `https://financialmodelingprep.com/api/v3/stock/real-time-price/${state.portfolio}`
      )

      if (!res.data.companiesPriceList) {
        return
      }

      state.indexInfo = []
      res.data.companiesPriceList.forEach(stock => {
        let date = new Date()
        let hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
        let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
        let second = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
        stock.time = `${hour}:${minute}:${second}`
        commit('addToIndexInfo', stock)
      })
    },
    async performSearch({ state }, phrase) {
      state.searchResults.push({'symbol': 'nxt', 'name': 'next'})
      let search = await axios.get(
        `https://financialmodelingprep.com/api/v3/search?query=${phrase}`
      )

      let quoteSearch = ''
      search.data.forEach(stock => {
        quoteSearch += (stock.symbol + ',')
      })

      let res = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${quoteSearch}`
      )
      state.searchResults = res.data
    }
  },
  modules: {
  }
})
