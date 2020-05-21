import Vue from 'vue'

// BootstrapVue for the UI
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue';
import store from "./store"
import router from './router'

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.prototype.$xEventBus = new Vue(); // Global event bus

// add you new Vue object to a variable
const vueapp = new Vue({
    store,          // Global store
    router,
    el: '#app',
    render: h => h(App)
});
