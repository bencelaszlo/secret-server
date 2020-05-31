<template>
  <div id="app">
    <CreateSecret/>
  </div>
</template>

<script>
import CreateSecret from './components/CreateSecret.vue'

export default {
  name: 'App',
  components: {
    CreateSecret
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
</style>
