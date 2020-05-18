// store/index.js

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


/*
import VuexPersist from 'vuex-persist';


const vuexPersist = new VuexPersist({
    key: 'xchart-tvjs-vuex',
    storage: window.localStorage
})

 */

/*
For any non-trivial app, we will likely need to leverage modules. Here's an example project structure:
└── store
    ├── index.js          # where we assemble modules and export the store
    ├── actions.js        # root actions
    ├── mutations.js      # root mutations
    └── modules
        ├── cart.js       # cart module
        └── products.js   # products module
As a reference, check out the Shopping Cart Example - https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart
 */
//Application-level state is centralized in the store.
export default new Vuex.Store({
    state: {
        currentSymbol: "",
        currentCompanyName: "",
        ohlc: [],
        dateMap: new Map(),

        currentTimeFrame: "daily",   // daily, weekly

        settings: {
            pricechart: {
                chartType: "HLC",  // Candle, OHLC, HLC
                upBarColor: "#273EE0",
                downBarColor: "#CE46AA",
                lineWidth: 2,
                upCandleHollow: true,
                showVolume: true,
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
     * The only way to mutate the state is by committing mutations, which are synchronous transactions.
     * Vuex state should be updated through the mutations events.
     */
    mutations: {
        /**
         * Send newSymbolLoaded event to trigger this mutation
         */
        newSymbolLoaded (state, payload) {
            console.log("Vuex::Updating vuex state data", payload)
            state.currentSymbol = payload.symbol
            state.currentCompanyName = payload.companyName
            state.ohlc = payload.ohlc

            state.dateMap.clear()
            for (var i = 1; i < payload.ohlc.length; i++) {
                let ohlcOne = payload.ohlc[i]
                state.dateMap.set(ohlcOne[0], ohlcOne)
            }
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

    //
    // Asynchronous logic should be encapsulated in, and can be composed with actions
    //
    actions: {},

    //plugins: [vuexPersist.plugin],
});
