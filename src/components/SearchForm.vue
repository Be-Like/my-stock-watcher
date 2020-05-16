<template>
  <div>
    <transition name="expand">
      <form
        v-if="!hideSearchbar"
        :class="{expand: !hideSearchbar}"
        @submit.prevent="performSearch(phrase)"
      >
        <input
          class="form-group"
          v-model="phrase"
          ref="searchField"
          type="text"
          placeholder="Search for stock"
        >
      </form>
    </transition>
    <transition name="fade" mode="out-in">
      <svg
        v-if="hideSearchbar"
        key="searchIcon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="18px"
        height="18px"
        @click="showSearch"
      >
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
      <svg
        v-else
        key="closeIcon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="black"
        width="18px"
        height="18px"
        @click="closeSearch"
      >
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      hideSearchbar: state => state.hideSearchbar,
      searchPhrase: state => state.searchPhrase
    }),
    phrase: {
      get() {
        return this.searchPhrase
      },
      set(value) {
        this.setSearchPhrase(value)
      }
    }
  },

  methods: {
    ...mapActions(['performSearch']),
    ...mapMutations([
      'removeSearchResults',
      'setHideSearchbar',
      'setSearchPhrase'
    ]),
    closeSearch() {
      this.removeSearchResults()
      this.setHideSearchbar(true)
    },
    showSearch() {
      this.setHideSearchbar(false)
      this.$nextTick(() => {
        this.$refs.searchField.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  form {
    display: inline-block;
  }

  input {
    display: inline-block;
    width: 95%;
    transition-property: width;
  }

  .expand {
    width: 95%;
    transition-duration: 1s;
    transition-property: width;
  }

  .expand-enter, .expand-leave-to {
    width: 0;
  }

  svg {
    cursor: pointer;
    display: inline-block;
  }

  .fade-leave-active, .fade-enter-active {
    transition: opacity 0.5s ease;
  }

  .fade-leave-to, .fade-enter {
    opacity: 0;
  }
</style>
