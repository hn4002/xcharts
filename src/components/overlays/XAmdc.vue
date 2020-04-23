<script>
/**
    AMDC - Actionable Market Direction Call
    Based on today's market activity, if a market call was made, then that market call is actionable
    tomorrow morning only. So AMDC market call should be marked for tomorrow only.
    If we mark today with the new market call, then that will be peeking.
 */
import { Overlay } from 'trading-vue-js'

export default {
    //
    // Documentation: https://github.com/tvjsx/trading-vue-js/tree/master/docs/overlays
    //
    name: 'XAmdc',
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
            var colors = {
                R: "#2ECC711F", // Rally
                P: "#F1C40F1F", // Pressure
                C: "#C0392B1F",  // Correction
            }

            //console.log("amdc.draw() called. this.$props.data.length = " + this.$props.data.length)

            if (this.$props.data.length < 2) {
                return;
            }

            // Find gap between bars
            let n1 = layout.t2screen(this.$props.data[0][0])
            let n2 = layout.t2screen(this.$props.data[1][0])
            let w = n2 - n1

            // Some common variables
            let wOffset = w/2
            let y1 = ctx.canvas.clientHeight / 2
            let y2 = y1 + 100

            // TODO: Performance Improvement scope - instead of drawing a filled rectangle for each bar, we can
            // draw filled rectangle for mulitple bars at once if they are of the same color. For now, keep it simple.
            for (var i = 0; i < this.$props.data.length; i++) {

                let p1 = this.$props.data[i]

                if (!p1) continue

                ctx.fillStyle = colors[p1[1]]

                let x1 = layout.t2screen(p1[0]) - wOffset
                let x2 = x1 + w

                // Background
                ctx.beginPath()
                ctx.moveTo(x1, y1)
                ctx.lineTo(x1, y2)
                ctx.lineTo(x2, y2)
                ctx.lineTo(x2, y1)
                ctx.fill()

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
            return ['XAmdc']  // This is the overlay Id. It is used in the "type" field in data.json.
        }
    },
    // Define internal setting & constants here
    computed: {
        sett() { // Just an alias
            return this.$props.settings
        },
        colors1() {
            return {
                R: "#D5F5E3", // Rally
                P: "#FDEBD0", // Pressure
                C: "#F5B7B1",  // Correction
            }
        }
    }
}

</script>
