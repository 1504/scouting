import Vue from 'vue'
import App from './App.vue'
import VueImpression from 'vue-impression';
import VueResource from 'vue-resource';
import 'vue-impression/dist/styles/index.scss';
import '@fortawesome/fontawesome-free/css/all.css'
import store from "store2"
Vue.use(VueImpression)
Vue.use(VueResource)
Vue.config.productionTip = false
const requireComponent = require.context(
    './components', // The relative path of the components folder
    false, // Whether or not to look in subfolders
    /\w+\.(vue|js)$/ // The regular expression used to match base component filenames
)
requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName) // Get component config
    const componentName = fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    Vue.component(componentName, componentConfig.default || componentConfig) // Register component globally
})
new Vue({
    render: h => h(App),
    data: { //global data store
        reports: store('data') || [],
        settings: store('settings') || {
            password: '',
            name: ''
        },
    },
    methods: {
        clear() {
            store(false);
            this.$root.reports = [];
            this.$toast({ position: 'bottom', message: 'Stored Data Cleared' });
        },
    }
}).$mount('#app')