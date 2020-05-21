<template>

    <div>
        <Header :bus="bus"></Header>
        <SettingsModal></SettingsModal>
        <MainChart :bus="bus" id="tv-container"></MainChart>
<!--        <SettingsPanel></SettingsPanel>-->
    </div>


</template>

<script>

    import Vue from 'vue';
    import MainChart from "./components/MainChart.vue";
    import Header from "./components/Header.vue";
    import SettingsModal from "./components/SettingsModal.vue";
    import SettingsPanel from "./components/SettingsPanel.vue";

    export default {
        name: 'MainChartPage',
        components: {
            SettingsPanel,
            Header,
            SettingsModal,
            MainChart,
        },
        data() {
            return {
                main_chart: MainChart,
                bus: new Vue(),
            }
        },

        mounted() {
            this.main_chart = MainChart
            this.bus.$emit('loadChartData', this.$store.state.currentSymbol)
            console.log(this.$store.state.currentSymbol, this.$store.state.currentCompanyName)
        },

        methods: {
        },
    };

</script>

<style>

    #tv-container{
        background-color: #efefef;
        /*position: absolute;*/
        /*top: 56px;*/
        /*border-top: #e1e1e1 solid 1px;*/
    }

    .trading-vue-legend {
        background-color: white;
        border: #9b9ca0 1px solid;
    }


    /*
    .t-vue-ind,
    .t-vue-iname,
    .t-vue-lbtn-grp,
    .t-vue-ivalues,
    .trading-vue-ohlcv {
        margin-bottom: 0px;
        padding-bottom: 0.5em;
    }
    */

    /*
    .t-vue-indicators,
    .t-vue-iname,
    .t-vue-lbtn-grp,
    .t-vue-ivalues,
    .trading-vue-ohlcv {
        background-color: white;
    }
    */

    .t-vue-lbtn {
        margin-bottom: 0px;
    }

    .highlight {
        /*color: #ffff00;*/
        /*text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;   #fcf8e3;*/
        background-color: #fff3cd;
    }

    .highlight1 {
        background-color: yellow;
    }
</style>
