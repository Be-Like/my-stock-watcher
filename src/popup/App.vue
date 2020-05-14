<template>
  <div>
    <robinhood-header />
    <SearchForm />
    <!-- <listing /> -->
    <transition name="component-fade" mode="out-in">
      <component :is="currentView" />
    </transition>
    <!-- <search-results /> -->
  </div>
</template>

<script>
import RobinhoodHeader from '../components/RobinhoodHeader'
import SearchForm from '../components/SearchForm'
import Listing from '../components/Listing'
import SearchResults from '../components/Search'

export default {
  name: 'App',
  components: {
    RobinhoodHeader,
    SearchForm,
    Listing,
    SearchResults
  },

  computed: {
    currentView() {
      return this.$store.state.searchResults.length === 0 ?
        Listing : SearchResults
    }
  },

  created() {
    this.$store.commit('loadLocalStorage')
  }
}
</script>

<style>
  html {
    width: 400px;
    height: 400px;
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
