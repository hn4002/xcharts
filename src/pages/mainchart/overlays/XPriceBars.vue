<script>
    // Renedrer for ohlcbar + volume (optional)
    // It can be used as the main chart or an indicator

    import XOhlcBar from '../primitives/xohlcbar.js'
    import XCandle from '../primitives/xcandle.js'
    import XVolbar from '../primitives/xvolbar.js'
    import { Overlay, layout_cnv, VolBar } from 'trading-vue-js'

    export default {
        name: 'XPriceBars',
        mixins: [Overlay],
        methods: {
            meta_info() {
                return { author: 'X', version: '1.2.0' }
            },
            init() {
                //this.price = new Price(this) // TODO:
            },
            draw(ctx) {

                //console.log("XOhlcBar.draw() called. this.$props.data.length = " + this.$props.data.length)

                // render as main chart:
                if (this.$props.sub === this.$props.data) {
                    var cnv = {
                        ohlcbars: this.$props.layout.candles,
                        volume: this.$props.layout.volume,
                    }
                    // Else, as offchart / onchart indicator:
                } else {
                    cnv = layout_cnv(this)
                }

                let BarRenderer = XOhlcBar
                let thinVolumeBar = true
                if (this.chartType == "Candle" || this.chartType == "Candles" || this.chartType == "XCandle" || this.chartType == "XCandles") {
                    BarRenderer = XCandle
                    thinVolumeBar = false
                }

                // Render volume bars
                if (this.showVolume) {
                    for (let i = 0; i < cnv.volume.length; i++) {
                        let volumeData = cnv.volume[i]
                        let barData = cnv.ohlcbars[i]
                        new XVolbar(this, ctx, volumeData, barData, thinVolumeBar)
                    }
                }

                // Render price bars
                for (var barData of cnv.ohlcbars) {
                    new BarRenderer(this, ctx, barData)
                }
            },
            use_for() { return ['XPriceBars'] },

            // When added as offchart overlay
            y_range() {
                return [
                    Math.max(...this.$props.sub.map(x => x[2])),
                    Math.min(...this.$props.sub.map(x => x[3]))
                ]
            }
        },

        // Define internal setting & constants here
        computed: {
            chartType() {
                return this.$store.state.settings.pricechart.chartType || "Candle"
            },
            upCandleHollow() {
                return this.$store.state.settings.pricechart.upCandleHollow || "true"
            },
            showVolume() {
                return this.$store.state.settings.pricechart.showVolume || "true"
            },
            volBarWidth() {
                return this.$store.state.settings.pricechart.lineWidth || 2
            },
            upBarColor() {
                return this.$store.state.settings.pricechart.upBarColor || "#007700"
            },
            downBarColor() {
                return this.$store.state.settings.pricechart.downBarColor || "#A70000"
            },
            lineWidth() {
                return this.$store.state.settings.pricechart.lineWidth || 1
            },
            upVolBarColor() {
                return this.upBarColor
            },
            downVolBarColor() {
                return this.downBarColor
            },
        },
        data() {
            return { price: {} }
        }

    }
</script>
