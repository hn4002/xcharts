<script>
    // Renedrer for ohlcbar + volume (optional)
    // It can be used as the main chart or an indicator

    import XOhlcBar from '../primitives/xohlcbar.js'
    import XVolbar from '../primitives/xvolbar.js'
    import { Overlay, layout_cnv } from 'trading-vue-js'

    export default {
        name: 'XOhlcBars',
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

                if (this.show_volume) {
                    for (let i = 0; i < cnv.volume.length; i++) {
                        let volumeData = cnv.volume[i]
                        let barData = cnv.ohlcbars[i]
                        new XVolbar(this, ctx, volumeData, barData)
                    }
                }

                for (var barData of cnv.ohlcbars) {
                    new XOhlcBar(this, ctx, barData)
                }

                //if (this.price_line) this.price.draw(ctx)  // TODO:
            },
            use_for() { return ['XOhlcBars'] },

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
            sett() {
                return this.$props.settings
            },
            show_volume() {
                return 'showVolume' in this.sett ?
                    this.sett.showVolume : true
            },
            price_line() {
                return 'priceLine' in this.sett ?
                    this.sett.priceLine : true
            },
            upVolBarColor() {
                return this.$store.state.settings.pricechart.upBarColor || "#007700"
            },
            downVolBarColor() {
                return this.$store.state.settings.pricechart.downBarColor || "#A70000"
            },
            volBarWidth() {
                return this.$store.state.settings.pricechart.barWidth || 2
            },
            upBarColor() {
                return this.$store.state.settings.pricechart.upBarColor || "#007700"
            },
            downBarColor() {
                return this.$store.state.settings.pricechart.downBarColor || "#A70000"
            },
            barWidth() {
                return this.$store.state.settings.pricechart.barWidth || 1
            },
            hlcOnly() {
                return this.$store.state.settings.pricechart.hlcOnly || false
            },
        },
        data() {
            return { price: {} }
        }

    }
</script>
