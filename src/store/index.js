import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

const config = {
  headers: {
    'Authorization': 'Bearer HGTjbbBbP8CS38Fn9h9CvNPMpG3V',
    'Accept': 'application/json'
  }
}

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
      if (state.portfolio === null) {
        state.portfolio = (symbol)
      } else {
        state.portfolio += (',' + symbol)
      }
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
      if (state.portfolio == null) return
      let res = await axios.get(
        `https://sandbox.tradier.com/v1/markets/quotes?symbols=${state.portfolio}`,
        config
      )

      if (!res.data) {
        return
      }

      state.indexInfo = (res.data.quotes.quote instanceof Array) ?
        res.data.quotes.quote : [res.data.quotes.quote]
    },
    async performSearch({ state }, phrase) {
      let search = await axios.get(
        `https://sandbox.tradier.com/v1/markets/search?q=${phrase}`,
        config
      )

      let searchResult = search.data.securities.security
      if (!(searchResult instanceof Array)) {
        searchResult = [searchResult]
      }

      let quoteSearch = ''
      searchResult.forEach(stock => {
        if (quoteSearch === '') {
          quoteSearch = (stock.symbol + ',')
          console.log(quoteSearch)
        } else {
          quoteSearch += (stock.symbol + ',')
          console.log(quoteSearch)
        }
      })

      let res = await axios.get(
        `https://sandbox.tradier.com/v1/markets/quotes?symbols=${quoteSearch}`,
        config
      )
      if (res.data.quotes.quote instanceof Array) {
        state.searchResults = res.data.quotes.quote
      } else {
        state.searchResults = [res.data.quotes.quote]
      }
    },
    async getCompanyInfo({ state }, stock) {
      // let res = await axios.get(
      //   `https://financialmodelingprep.com/api/v3/company/profile/${stock.symbol}`
      // )

      let details = stock
      // let data = res.data.profile

      console.log('Details', details)
      // console.log('Data', data)

      // details.dividend = data.lastDiv
      // details.range = data.range
      // details.industry = data.industry
      // details.website = data.website
      // details.description = data.description
      // details.ceo = data.ceo
      // details.sector = data.sector

      state.details = details
    }
  },
  modules: {
  }
})
