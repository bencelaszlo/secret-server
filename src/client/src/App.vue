<template>
  <div id="app">
    <div id="header">
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#header {
  background-color: red;
  min-height: 100px;
  height: 10%;
  margin-bottom: 60px;

  button {
    background-color: blue;

    &:hover {
      background-color: cyan;
    }
  }
}

form {
  width: 60%;
  text-align: center;
  margin: 0 auto;
}

input {
  width: 80%;
  margin-bottom: 20px;
}
</style>
