<template>
  <div>
    <transition name="component-fade" mode="in-out">
      <AlertBanner v-if="$store.state.alert" />
    </transition>
    <transition name="slide-fade" mode="out-in">
      <div
        v-if="!$store.state.showDetails"
        key="main"
      >
        <robinhood-header />
        <SearchForm />
        <transition name="component-fade" mode="out-in">
          <component :is="currentView" />
        </transition>
      </div>
      <div v-else key="details">
        <Details />
      </div>
    </transition>
  </div>
</template>

<script>
import AlertBanner from '../components/AlertBanner'
import RobinhoodHeader from '../components/RobinhoodHeader'
import SearchForm from '../components/SearchForm'
import Listing from '../components/Listing'
import SearchResults from '../components/Search'
import Details from '../components/Details'

export default {
  name: 'App',
  components: {
    AlertBanner,
    RobinhoodHeader,
    SearchForm,
    Listing,
    SearchResults,
    Details
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
    overflow: scroll;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #0badd8 ;
    border-radius: 25px;
    border: 3px solid white;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
  /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
