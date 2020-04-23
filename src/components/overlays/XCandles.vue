<script>
    // XCandles is a copy of Candles with some modifications:
    //  - debug statements for debugging during development
    //  - skip draw() if it is not required
    //  - the width of the wick is 2px and the body width is even instead of odd
    //
    // Renedrer for candlesticks + volume (optional)
    // It can be used as the main chart or an indicator

import XCandle from '../primitives/xcandle.js'
import { Overlay, layout_cnv, Volbar } from 'trading-vue-js'

export default {
    name: 'XCandles',
    mixins: [Overlay],
    methods: {
        meta_info() {
            return { author: 'C451', version: '1.2.0' }
        },
        init() {
            //this.price = new Price(this) // TODO:
        },
        draw(ctx) {

            //console.log("xcandles.draw() called. this.$props.data.length = " + this.$props.data.length)

            // If data === main candlestick data
            // render as main chart:
            if (this.$props.sub === this.$props.data) {
                var cnv = {
                    candles: this.$props.layout.candles,
                    volume: this.$props.layout.volume,
                }
                // Else, as offchart / onchart indicator:
            } else {
                cnv = layout_cnv(this)
            }

            if (this.show_volume) {
                for (var v of cnv.volume) {
                    new Volbar(this, ctx, v)
                }
            }

            for (var c of cnv.candles) {
                new XCandle(this, ctx, c)
            }

            //if (this.price_line) this.price.draw(ctx)  // TODO:
        },
        use_for() { return ['XCandles'] },

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
        colorCandleUp() {
            return this.sett.colorCandleUp ||
                this.$props.colors.colorCandleUp
        },
        colorCandleDw() {
            return this.sett.colorCandleDw ||
                this.$props.colors.colorCandleDw
        },
        colorWickUp() {
            return this.sett.colorWickUp ||
                this.$props.colors.colorWickUp
        },
        colorWickDw() {
            return this.sett.colorWickDw ||
                this.$props.colors.colorWickDw
        },
        colorWickSm() {
            return this.sett.colorWickSm ||
                this.$props.colors.colorWickSm
        },
        colorVolUp() {
            return this.sett.colorVolUp ||
                this.$props.colors.colorVolUp
        },
        colorVolDw() {
            return this.sett.colorVolDw ||
                this.$props.colors.colorVolDw
        }
    },
    data() {
        return { price: {} }
    }

}
</script>
