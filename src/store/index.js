import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    alert: null,
    portfolio: '',
    indexInfo: [],
    hideSearchbar: true,
    searchPhrase: '',
    searchResults: [],
    showDetails: false,
    details: null
  },
  mutations: {
    loadLocalStorage(state) {
      state.portfolio = localStorage.getItem('my_portfolio_key')
    },
    addToPortfolio(state, symbol) {
      state.portfolio += (symbol + ',')
      localStorage.setItem('my_portfolio_key', state.portfolio)
    },
    setHideSearchbar(state, isHidden) {
      state.hideSearchbar = isHidden
    },
    setSearchPhrase(state, phrase) {
      state.searchPhrase = phrase
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
    },
    openDetails(state) {
      state.showDetails = true
    },
    closeDetails(state) {
      state.showDetails = false
    }
  },
  actions: {
    async setAlert({ state }, alert) {
      state.alert = alert
      await setTimeout(() => {state.alert = null}, 3000)
    },
    async getIndexInfo({ state }) {
      console.log('Portfolio:', state.portfolio)
      let res = await axios.get(
        `https://sandbox.tradier.com/v1/markets/quotes?symbols=${state.portfolio}`,
        config
      )

      console.log('Response: ', res.data)

      if (!res.data) {
        return
      }

      state.indexInfo = res.data
    },
    async performSearch({ state }, phrase) {
      let search = await axios.get(
        // `https://financialmodelingprep.com/api/v3/search?query=${phrase}`
        `https://sandbox.tradier.com/v1/markets/search?q=${phrase}`,
        config
      )

      let quoteSearch = ''
      search.data.securities.security.forEach(stock => {
        quoteSearch += (stock.symbol + ',')
      })

      let res = await axios.get(
        // `https://financialmodelingprep.com/api/v3/quote/${quoteSearch}`,
        `https://sandbox.tradier.com/v1/markets/quotes?symbols=${quoteSearch}`,
        config
      )
      state.searchResults = res.data.quotes.quote
    },
    async getCompanyInfo({ state }, stock) {
      let res = await axios.get(
        `https://financialmodelingprep.com/api/v3/company/profile/${stock.symbol}`
      )

      let details = stock
      let data = res.data.profile

      details.dividend = data.lastDiv
      details.range = data.range
      details.industry = data.industry
      details.website = data.website
      details.description = data.description
      details.ceo = data.ceo
      details.sector = data.sector

      state.details = details
    }
  },
  modules: {
  }
})
