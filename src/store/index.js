// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

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

    actions: {}
});
