import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    portfolio: '',
    indexInfo: [],
    searchResults: []
  },
  mutations: {
    loadLocalStorage(state) {
      state.portfolio = localStorage.getItem('my_portfolio_key')
    },
    addToPortfolio(state, symbol) {
      state.portfolio += (symbol + ',')
      localStorage.setItem('my_portfolio_key', state.portfolio)
    },
    removeFromPortfolio(state, symbol) {
      let portfolio = state.portfolio.split(',')
      let index = portfolio.indexOf(symbol)
      portfolio.splice(index, 1)
      state.portfolio = portfolio.join(',')
      localStorage.setItem('my_portfolio_key', state.portfolio)
    },
    removeSearchResults(state) {
      state.searchResults = []
    }
  },
  actions: {
    async getIndexInfo({ state }) {
      let res = await axios.get(
        `https://financialmodelingprep.com/api/v3/quote/${state.portfolio}`
      )

      if (!res.data) {
        return
      }

      state.indexInfo = res.data
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
