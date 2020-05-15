<template>

    <div>
        <b-navbar toggleable="lg" type="light" variant="light">
            <b-navbar-brand href="#"><span>X</span><span>C</span>HARTS</b-navbar-brand>

            <b-nav-form v-on:submit.prevent="symbolInputEntered">
                <b-form-input v-model="symbolInputText" v-on:keyup.enter="symbolInputEntered" id="symbolInput" size="sm" class="mr-sm-2"></b-form-input>
                <b-button-group>
                    <b-button v-on:click="dailyButtonClicked" id="dailyButton" v-bind:variant="dailyButtonVariant" v-bind:class="{chartButtonActive: dailyActive}" size="sm" class="my-2 my-sm-0" type="button">Daily</b-button>
                    <b-button v-on:click="weeklyButtonClicked" id="weeklyButton" v-bind:variant="weeklyButtonVariant" v-bind:class="{chartButtonActive: weeklyActive}" size="sm" class="my-2 my-sm-0" type="button">Weekly</b-button>
                </b-button-group>
                <b-button-group>
                    <b-button v-on:click="amdcButtonClicked" id="amdcButton" v-bind:variant="amdcButtonVariant" size="sm" class="my-2 my-sm-0 ml-3" type="button">AMDC</b-button>
                    <b-tooltip target="amdcButton" variant="secondary" delay="1500">Actionable Market Direction Call</b-tooltip>
                    <b-button v-on:click="esmButtonClicked" id="esmButton" v-bind:variant="esmButtonVariant" size="sm" class="my-2 my-sm-0 " type="button">ESM</b-button>
                    <b-tooltip target="esmButton" variant="secondary" delay="1500">Earnings, Sales, Margin</b-tooltip>
                    <b-button v-on:click="tradesButtonClicked" id="tradesButton" v-bind:variant="tradesButtonVariant" size="sm" class="my-2 my-sm-0 " type="button">Trades</b-button>
                    <b-tooltip target="tradesButton" variant="secondary" delay="1500">Trades, Portfolio</b-tooltip>
                </b-button-group>
            </b-nav-form>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <!-- b-nav-item href="#">Report</b-nav-item -->
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <!-- b-nav-item href="#" >Market</b-nav-item -->
                    <b-nav-form>
                        <b-button v-on:click="inspectButtonClicked" id="inspectButton" ref="inspectButton" size="sm" class="my-2 my-sm-2 ml-3" type="button">Inspect</b-button>
                    </b-nav-form>

                    <!--
                    <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <em>MrHari</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                    -->
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div id="tv-container" style="z-index: 0;">
            <component v-bind:is="main_chart" :bus="bus" ></component>
        </div>
    </div>


</template>

<script>

import Vue from 'vue';
import MainChart from "./components/MainChart.vue";

export default {
    name: 'app',
    components: {
        MainChart
    },
    data() {
        return {
            test_index: 0,
            symbolInputText: this.$store.state.currentSymbol ||  "PLMR",
            main_chart: MainChart,
            bus: new Vue(),
        }
    },

    computed: {
        dailyButtonVariant() {
            return this.$store.state.currentTimeFrame == "daily"? "info" : "outline-info"
        },
        weeklyButtonVariant() {
            return this.$store.state.currentTimeFrame == "weekly"? "info" : "outline-info"
        },
        amdcButtonVariant() {
            return this.$store.state.amdc? "danger" : "outline-danger"
        },
        esmButtonVariant() {
            return this.$store.state.esm? "danger" : "outline-danger"
        },
        tradesButtonVariant() {
            return this.$store.state.trades? "danger" : "outline-danger"
        },
        dailyActive() {
            return this.$store.state.currentTimeFrame == "daily"
        },
        weeklyActive() {
            return this.$store.state.currentTimeFrame == "weekly"
        }
    },

    mounted() {
        this.main_chart = MainChart
        this.bus.$emit('loadChartData', this.symbolInputText)
        console.log(this.$store.state.currentSymbol, this.$store.state.currentCompanyName)
    },

    methods: {
        symbolInputEntered() {
            console.log("==> App::symbolInputEntered: " + this.symbolInputText)
            this.bus.$emit('loadChartData', this.symbolInputText)
        },

        dailyButtonClicked() {
            console.log("==> App::dailyButtonClicked clicked")

            // Update vuex state
            this.$store.commit("updateTimeFrame", "daily")

            // Trigger reload of the chart
            // this.symbolInputText is updated after an input event in the text box. The streamer-sidebar chrome extension
            // uses jquery to update the text box -> $('#symbolInput').val(symbol); This does not trigger an input event,
            // so this.symbolInputText does not get updated. After trying multiple ways to get this sorted out, finally
            // we came to this solution where we just use direct javascript to read the value from the text box
            let symbolInputActualValue = document.getElementById("symbolInput").value;
            console.log("App::dailyButtonClicked:: symbolInputActualValue = ", symbolInputActualValue, "this.symbolInputText = ", this.symbolInputText)
            if (this.symbolInputText != symbolInputActualValue) {
                console.log("App::dailyButtonClicked:: Updating this.symbolInputText")
                this.symbolInputText = symbolInputActualValue
                console.log("App::dailyButtonClicked:: symbolInputActualValue = ", symbolInputActualValue, "this.symbolInputText = ", this.symbolInputText)
            }
            this.bus.$emit('loadChartData', this.symbolInputText)
        },

        weeklyButtonClicked() {
            console.log("==> App::weeklyButtonClicked clicked")

            // Update vuex state
            this.$store.commit("updateTimeFrame", "weekly")

            // Trigger reload of the chart
            // See the comment on the dailyButtonClicked() on why we are using direct javascript below insted of vue way of doing things
            let symbolInputActualValue = document.getElementById("symbolInput").value;
            console.log("App::weeklyButtonClicked:: symbolInputActualValue = ", symbolInputActualValue, "this.symbolInputText = ", this.symbolInputText)
            if (this.symbolInputText != symbolInputActualValue) {
                console.log("App::weeklyButtonClicked:: Updating this.symbolInputText")
                this.symbolInputText = symbolInputActualValue
                console.log("App::weeklyButtonClicked:: symbolInputActualValue = ", symbolInputActualValue, "this.symbolInputText = ", this.symbolInputText)
            }
            this.bus.$emit('loadChartData', this.symbolInputText)
        },

        amdcButtonClicked() {
            console.log("==> App::amdcButtonClicked clicked")
            this.$store.state.amdc = !this.$store.state.amdc
            this.bus.$emit('showHideAmdc', this.$store.state.amdc)
        },

        esmButtonClicked() {
            console.log("==> App::esmButtonClicked clicked")
            this.$store.state.esm = !this.$store.state.esm
            this.bus.$emit('showHideEsm', this.$store.state.esm)
        },

        tradesButtonClicked() {
            console.log("==> App::tradesButtonClicked clicked")
            this.$store.state.trades = !this.$store.state.trades
            this.bus.$emit('showHideTrades', this.$store.state.trades)
        },

        inspectButtonClicked() {
            console.log("==> App::inspectButtonClicked clicked")
            console.log("this.symbolInputText = " + this.symbolInputText);
            console.log("this.$store.state.currentSymbol = " + this.$store.state.currentSymbol);
            console.log("this.$store.state.currentCompanyName = " + this.$store.state.currentCompanyName);
            console.log("this.$store.state.amdc = " + this.$store.state.amdc);
            console.log("this.$store.state.esm = " + this.$store.state.esm);
            console.log("this.$store.state.trades = " + this.$store.state.trades);
            console.log("this.$store.state = " + this.$store.state);
        },

    },
 };

//
// Some plain old Javascript code for "advanced" features
//

// I hate some nuiances of bootrap and this is one of them. After a button is clicked, it keeps the button in focus
// state and does not have the original color of the button which can look ugly sometimes.
document.addEventListener('click', function(e) {
    if(document.activeElement.toString() == '[object HTMLButtonElement]') {
        document.activeElement.blur();
    }
    console.log(e);  // To avoid getting unused vars error during buid time
});

</script>

<style>
html,
body {
    background-color: #efefef;
    margin: 0;
    padding: 0;
    overflow: hidden;
}


.t-vue-iname,
.t-vue-lbtn-grp,
.t-vue-ivalues,
.trading-vue-ohlcv {
    background-color: white;
}

.highlight {
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
}

.highlight1 {
    background-color: yellow;
}

#tv-container{
    position: absolute;
    top: 56px;
    border-top: #e1e1e1 solid 1px;
}

*:focus,
*:active
{
    outline: none;
    box-shadow: none !important;
    -webkit-appearance: none;
}

.btn:focus {
    outline: none;
}

.button:focus {
    outline: none;
}

.navbar-brand {
    //font-variant:small-caps;
    //font-weight:bold;
}
.navbar-brand span {
    font-size: 130%;
}
.navbar-light .navbar-brand {
    color: #1184ff;
}

</style>
