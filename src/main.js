import Vue from 'vue'
import App from './App.vue'
import VueImpression from 'vue-impression';
import 'vue-impression/dist/styles/index.scss';
Vue.use(VueImpression);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
