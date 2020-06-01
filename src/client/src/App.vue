<template>
  <div id="app">
    <div id="header">
      <h1>Secret</h1>
      <button @click="selectPage('create')">Save Secret</button>
      <button @click="selectPage('retrieve')">Retrieve Secret</button>
    </div>

    <create-secret v-if="selectedPage === 'create'"/>
    <retrieve-secret v-if="selectedPage == 'retrieve'"/>
  </div>
</template>

<script>
import CreateSecret from './components/CreateSecret.vue'
import RetrieveSecret from './components/RetrieveSecret.vue'

export default {
  name: 'App',

  components: {
    CreateSecret,
    RetrieveSecret
  },

  data () {
    return {
      selectedPage: 'create'
    }
  },

  methods: {
    selectPage (page) {
      if (page !== this.selectedPage) {
        this.selectedPage = page
      }
    }
  }
}
</script>

<style lang="scss">
@import './style/main';

body {
    background-color: $light;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#header {
  background-color: $primary;
  min-height: 10rem;
  height: 10%;
  margin-bottom: 3rem;

  button {
    background-color: $secondary-dark;
    color: $light;
    border: 0;
    width: 20rem;
    margin-right: 1rem;
    font-size: 1.5rem;

    &:hover {
      background-color: $secondary-light;
    }
  }
}

.content {
  > form {
    > input {
      font-size: 1rem;
    }

    > button {
      font-size: 1.5rem;
    }
  }
}

form {
  width: 60%;
  text-align: center;
  margin: 0 auto;
  border: 1px solid white;
  padding-top: 3rem;
  padding-bottom: 3rem;

  > input {
    width: 60%;
    margin-bottom: 1rem;
    background-color: white;
    border: 0;
  }

  > button {
    border: 0;
    background-color: $secondary-dark;
    color: $light;
    width: 20rem;
    height: 2rem;

    &:hover {
      background-color: $secondary-light;
    }
  }
}
</style>
