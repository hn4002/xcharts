import Vue from 'vue'
import Router from 'vue-router'
import MainChartPage from '../pages/mainchart/MainChartPage.vue'
import SettingsPage from '../pages/settings/SettingsPage.vue'
import TradesPage from '../pages/trades/TradesPage.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'MainChartPage',
            component: MainChartPage
        },
        {
            path: '/settings',
            name: 'SettingsPage',
            component: SettingsPage
        },
        {
            path: '/trades',
            name: 'TradesPage',
            component: TradesPage
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
