import Vue from 'vue'
import App from './App.vue'
import VueClipboard from 'vue-clipboard2'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
Vue.use(VModal)

new Vue({
  render: h => h(App)
}).$mount('#app')
