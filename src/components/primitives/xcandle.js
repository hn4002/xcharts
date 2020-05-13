
// Candle object for Candles overlay

export default class XCandle {

    constructor(overlay, ctx, data) {
        this.ctx = ctx
        this.self = overlay
        this.style = data.raw[6] || this.self
        this.draw(data)
    }

    draw(data) {
        // Wick width = 1 or 2?
        const wick_width = 1

        // body color
        const body_color = data.c <= data.o ?
            this.style.colorCandleUp :
            this.style.colorCandleDw

        // wick color
        const wick_color = data.c <= data.o ?
            this.style.colorWickUp :
            this.style.colorWickDw

        // what is this?
        const wick_color_sm = this.style.colorWickSm

        // w = width, hw = half width, h = body height, max_h = ?
        let w = Math.max(data.w, 1)
        let hw = Math.max(Math.floor(w * 0.5), 1)
        let h = Math.abs(data.o - data.c)
        let max_h = data.c === data.o ? 1 : 2

        let body_x_offset = 1
        let body_width_offset = 1
        if (wick_width % 2 == 0) {
            body_x_offset = 2
            body_width_offset = 2
        }

        if (wick_width == 1) {
            // Draw the wick from low to high of 1px wide
            this.ctx.strokeStyle = w > 1 ? wick_color : wick_color_sm
            this.ctx.beginPath()
            this.ctx.moveTo(
                Math.floor(data.x) - 0.5,
                Math.floor(data.h)
            )
            this.ctx.lineTo(
                Math.floor(data.x) - 0.5,
                Math.floor(data.l)
            )
            this.ctx.stroke()
        } else {
            // Draw the wick from low to high of 2px wide
            this.ctx.fillStyle = wick_color
            this.ctx.fillRect(
                Math.floor(data.x - (wick_width / 2) -0.5),
                Math.floor(data.l),
                Math.floor(wick_width),                  // Width of the wick
                Math.floor(data.h - data.l)
            )
        }

        // Draw the body
        if (data.w > 1.5 || data.o === data.c) {
            // Draw a body as a rectangle if it is thick (>1.5).

            this.ctx.fillStyle = body_color

            // TODO: Move common calculations to layout.js
            let s = data.c >= data.o ? 1 : -1
            this.ctx.fillRect(
                Math.floor(data.x - hw - body_x_offset),
                Math.floor(data.o - 1),
                Math.floor(hw * 2 + body_width_offset),
                Math.floor(s * Math.max(h, max_h))
            )

        } else {
            // Draw a body as a line if it is too thin.
            // The line will be drawn of 1 px.

            this.ctx.strokeStyle = body_color

            this.ctx.beginPath()
            this.ctx.moveTo(
                Math.floor(data.x) - 0.5,
                Math.floor(Math.min(data.o, data.c)),
            )
            this.ctx.lineTo(
                Math.floor(data.x) - 0.5,
                Math.floor(Math.max(data.o, data.c)),
            )

            this.ctx.stroke()

        }

    }

}
