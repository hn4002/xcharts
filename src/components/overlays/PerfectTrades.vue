<script>

import { Overlay } from 'trading-vue-js'

export default {
    //
    // Documentation: https://github.com/tvjsx/trading-vue-js/tree/master/docs/overlays
    //
    name: 'PerfectTrades',
    mixins: [Overlay],
    methods: {
        // You have following resources available:
        //  ctx -> that is the canvas
        //  $props
        //      layout -> has screen mapping methods
        //              layout.t2screen(t) // time -> x
        //              layout.$2screen($) // price -> y
        //              layout.t_magnet(t) // time -> nearest candle x
        //              layout.screen2$(y) // y -> price
        //              layout.screen2t(x) // x -> time
        //
        draw(ctx) {
            let layout = this.$props.layout // Layout object (see API BOOK)
            ctx.lineWidth = 1.5
            ctx.strokeStyle = 'black'
            for (var i in this.$props.data) {

                let p = this.$props.data[i]

                // We use previos point here, but the profit should
                // be already in the data (in a real usecase)
                let prev = this.$props.data[i - 1]

                ctx.fillStyle = p[1] ? this.buy_color : this.sell_color
                ctx.beginPath()
                let x = layout.t2screen(p[0]) // x - Mapping
                let y = layout.$2screen(p[2]) // y - Mapping
                ctx.arc(x, y, this.marker_size + 0.5, 0, Math.PI * 2, true)
                ctx.fill()
                ctx.stroke()

                // If this is a SELL, draw the profit
                if (this.show_label && p[1] === 0 && prev) {
                    let profit = p[2] / prev[2] - 1
                    profit = (profit * 100).toFixed(2) + '%'
                    ctx.fillStyle = '#555'
                    ctx.font = '16px Arial'
                    ctx.textAlign = 'center'
                    ctx.fillText(profit , x, y - 25)
                }
            }
        },

        // Meta information about this overlay.
        meta_info() {
            return {
                author: 'Mr X',
                version: '1.0.0',
                contact: /*opt*/ '<email>',
                github: /*opt*/ '<GitHub Page>',
            }
        },

        // Register this overlay
        use_for() {
            return ['PerfectTrades']  // This is the overlay Id. It is used in the "type" field in data.json.
        }
    },
    // Define internal setting & constants here
    computed: {
        sett() { // Just an alias
            return this.$props.settings
        },
        buy_color() {
            return this.sett['buyColor'] || '#bfff00' // default value
        },
        sell_color() {
            return this.sett['sellColor'] || '#ec4662'
        },
        marker_size() {
            return this.sett['markerSize'] || 5
        },
        show_label() {
            return this.sett['showLabel'] !== false
        }
        /*
        In data.json, you should have something like this for this overlay
            "name": "My Trades",             -> This is shown on the chart
            "type": "PerfectTrades",         -> This should match with the user_for() above.
            "data": [
                [
                    1552550400000,
                    1,
                    3935.4046923289475
                ],
                ...
            ]
            "settings": {
                "z-index": 5,               -> 0 = candlestick layer, < 0 for behind the chart, > 0 for above the chart
                "buy-color": "#bfff00",
                "sell-color": "#ec4662",
                "marker-size": 5,
                "show-label": true
            }
         */
    }
}


</script>
