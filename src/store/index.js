// store/index.js

import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
    key: 'xchart-tvjs-vuex',
    storage: window.localStorage
})

export default new Vuex.Store({
    state: {
        currentSymbol: "",
        currentCompanyName: "",
        ohlc: [],

        currentTimeFrame: "daily",   // daily, weekly

        settings: {
            candle: {
                upCandleHollow: true,
                lineWidth: 1,
            },
            pricechart: {
                upBarColor: "#273EE0",
                downBarColor: "#CE46AA",
                barWidth: 2,
                hlcOnly: true,
            },
        },

        // Different selections
        amdc: true,
        esm: true,
        trades: false,
    },

    // Vuex getters is to Vue computed as Vuex state is to Vue data.
    // If information involves some derivation or computation, then use getters. The computed results are cached.
    getters: {},

    /**
        Vuex state should be updated through the mutations events.
     */
    mutations: {
        /**
         * Send newSymbolLoaded event to trigger this mutation
         */
        newSymbolLoaded (state, payload) {
            console.log("Vuex::Updating vuex state data", payload);
            state.currentSymbol = payload.symbol
            state.currentCompanyName = payload.companyName
            state.ohlc = payload.ohlc
        },

        /**
         * Send updateTimeFrame event to trigger this mutation
         */
        updateTimeFrame(state, timeFrame) {
            if (timeFrame == "weekly") {
                state.currentTimeFrame = "weekly"
            } else {
                state.currentTimeFrame = "daily"
            }
        },
    },

    actions: {},

    plugins: [vuexPersist.plugin],
});
