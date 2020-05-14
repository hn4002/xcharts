import Vue from 'vue';
import store from "./store";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue';

// add you new Vue object to a variable
const vueapp = new Vue({
    store,
    el: '#app',
    render: h => h(App)
});
