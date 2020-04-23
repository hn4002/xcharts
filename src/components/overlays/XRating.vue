<script>
    // XRating plots an indicator on the main chart which ranges from 0 to 100
    //
    // XRating renderer

    // Adds all necessary stuff for you.
    import { Overlay } from 'trading-vue-js'

    export default {
        name: 'XRating',
        mixins: [Overlay],
        data() {
            return {
                COLORS:
                    [
                        '#42b28a', '#5691ce', '#612ff9',
                        '#d50b90', '#ff2316'
                    ]
            }
        },

        // Define internal setting & constants here
        computed: {
            sett() {
                return this.$props.settings
            },
            line_width() {
                return this.sett.lineWidth || 0.75
            },
            color() {
                const n = this.$props.num % 5
                return this.sett.color || this.COLORS[n]
            },
            data_index() {
                return this.sett.dataIndex || 1
            }
        },

        methods: {
            meta_info() {
                return { author: 'MrHari', version: '2.0.0' }
            },
            // Here goes your code. You are provided with:
            // { All stuff is reactive }
            // $props.layout -> positions of all chart elements +
            //  some helper functions (see layout_fn.js)
            // $props.interval -> candlestick time interval
            // $props.sub -> current subset of candlestick data
            // $props.data -> your indicator's data subset.
            //  Comes "as is", should have the following format:
            //  [[<timestamp>, ... ], ... ]
            // $props.colors -> colors (see TradingVue.vue)
            // $props.cursor -> current position of crosshair
            // $props.settings -> indicator's custom settings
            //  E.g. colors, line thickness, etc. You define it.
            // $props.num -> indicator's layer number (of All
            // layers in the current grid)
            // $props.id -> indicator's id (e.g. EMA_0)
            // ~
            // Finally, let's make the canvas dirty!


            draw(ctx) {

                const layout = this.$props.layout

                const height = ctx.canvas.clientHeight
                const yfactor = height / 100.0
                //console.log("height, yfactor: ", height, yfactor)

                // Where am I right now?
                let cursor = this.$props.cursor
                if (!cursor.x || !cursor.y) {
                    //
                } else {
                    //console.log(cursor.x)
                    //console.log(cursor.y)
                    //console.log(cursor.y$)
                    let cursorData = cursor.values[cursor.grid_id]
                    let indicatorId = this.$props.id
                    //console.log(indicatorId, cursorData)
                    if (indicatorId in cursorData) {
                        let p = cursorData[indicatorId]
                        let pY = Math.floor(height - p[1] * yfactor) - 0.5
                        // If pY and cursor.y are close by, then we know that the mouse is hovering over the indicator
                        let diffPct = 100.0 * Math.abs(pY - cursor.y) / height
                        //console.log(p, pY, cursor.y, height, diffPct)
                        if (diffPct < 2.0) {
                            //console.log("=========> highlight ", this.$props.id)
                            let v = document.getElementById(this.$props.id);
                            if (v) {
                                if (!v.classList.contains("highlight")) {
                                    v.classList.add("highlight");
                                }
                            }
                        } else { // Remove highlight
                            //console.log("=========> remove highlight ", this.$props.id)
                            let v = document.getElementById(this.$props.id);
                            if (v) {
                                if (v.classList.contains("highlight")) {
                                    v.classList.remove("highlight");
                                }
                            }
                        }
                    }
                }
                //console.log(cursor)


                ctx.lineWidth = this.line_width
                ctx.strokeStyle = this.color
                ctx.beginPath()


                //console.log(this)
                //console.log("xrating.draw() called. $props.id = " + this.$props.id  + ". this.$props.data.length = " + this.$props.data.length)

                for (let p of this.$props.data) {
                    let x = layout.t2screen(p[0])
                    let y = Math.floor(height - p[1] * yfactor) - 0.5

                    ctx.lineTo(x, y)
                }
                ctx.stroke()
            },

            // For all data with these types overlay will be
            // added to the renderer list. And '$props.data'
            // will have the corresponding values. If you want to
            // redefine the default behviour for a prticular
            // indicator (let's say EMA),
            // just create a new overlay with the same type:
            // e.g. use_for() { return ['EMA'] }.
            use_for() { return ['XRating'] },

            // Colors for the legend, should have the
            // same dimention as a data point (excl. timestamp)
            data_colors() {
                return [this.color]
            },

            // Defines legend format (values & colors)
            // Take a look at Trades.vue for an example
            legend(values) {
                return [
                    {
                        value: values[1].toFixed(0),
                        color: this.color,
                    }
                ]
            }
        },
    }
</script>
