<template>
    <div class="settings-panel">
        <h2>Price Chart</h2>
        <b-card bg-variant="light">
            <b-form-group
                    label-cols-sm="3"
                    label="Chart Type:"
                    label-align-sm="right"
                    label-for="nested-street"
            >
                <b-form-select v-model="chartType" :options="chartTypeOptions"></b-form-select>
            </b-form-group>
            <b-form-group
                    label-cols-sm="3"
                    label="Up Bar Color:"
                    label-align-sm="right"
                    label-for="nested-street"
            >
                <b-form-input v-model="upBarColor" id="settings-input-upBarColor"></b-form-input>
            </b-form-group>
            <b-form-group
                    label-cols-sm="3"
                    label="Down Bar Color:"
                    label-align-sm="right"
                    label-for="nested-street"
            >
                <b-form-input v-model="downBarColor" id="settings-input-downBarColor"></b-form-input>
            </b-form-group>
            <b-form-group
                    label-cols-sm="3"
                    label="Line Width:"
                    label-align-sm="right"
                    label-for="nested-street"
            >
                <b-form-input v-model="lineWidth" id="settings-input-lineWidth"></b-form-input>
            </b-form-group>
            <b-form-group
                    label-cols-sm="3"
                    label="UP Candle Hollow:"
                    label-align-sm="right"
                    label-for="nested-street"
            >
                <b-form-checkbox v-model="upCandleHollow" name="check-button" switch></b-form-checkbox>
            </b-form-group>
            <b-form-group
                    label-cols-sm="3"
                    label="Show Volume:"
                    label-align-sm="right"
                    label-for="nested-street"
            >
                <b-form-checkbox v-model="showVolume" name="check-button" switch></b-form-checkbox>
            </b-form-group>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: "SettingsPanel",

        data() {
            return {
                chartType: "HLC",
                chartTypeOptions: [
                    {value: "Candles", text: 'Candles'},
                    {value: "HLC", text: 'HLC'},
                    {value: "OHLC", text: 'OHLC'},
                ],
                upBarColor: "#273EE0",
                downBarColor: "#CE46AA",
                lineWidth: 2,
                upCandleHollow: true,
                showVolume: true,
            }
        },

        mounted() {
            this.$xEventBus.$on('settingsPanel.load', this.loadSettingsPanel)
            this.$xEventBus.$on('settingsPanel.save', this.saveSettingsPanel)
            // Load initial settings
            this.loadSettingsPanel();
        },

        created() {
        },

        beforeDestroy() {
            this.$xEventBus.$off('settingsPanel.load')
            this.$xEventBus.$off('settingsPanel.save')
        },


        methods: {
            loadSettingsPanel() {
                // Load settings from store
                console.log("loadSettingsPanel this.$store.state.settings => ", this.$store.state.settings.pricechart)
                this.chartType = this.$store.state.settings.pricechart.chartType;
                this.upBarColor = this.$store.state.settings.pricechart.upBarColor;
                this.downBarColor = this.$store.state.settings.pricechart.downBarColor;
                this.lineWidth = this.$store.state.settings.pricechart.lineWidth;
                this.upCandleHollow = this.$store.state.settings.pricechart.upCandleHollow;
                this.showVolume = this.$store.state.settings.pricechart.showVolume;
            },

            saveSettingsPanel() {
                // Save settings to store
                // Update vuex state
                console.log("saveSettingsPanel called")
                this.$store.commit("saveSettings", {
                    chartType: this.chartType,
                    upBarColor: this.upBarColor,
                    downBarColor: this.downBarColor,
                    lineWidth: parseInt(this.lineWidth),
                    upCandleHollow: this.upCandleHollow,
                    showVolume: this.showVolume,
                })
            },
        }

    }
</script>

<style scoped>
    h1 {
        font-size: 24px;
        margin-top: 10px;
        margin-bottom: 20px;
        color: #555555;
    }

    h2 {
        font-size: 18px;
        color: #666666;
    }

    .settings-panel {
        width:750px;
        align:center;
        margin: auto;
    }
</style>
