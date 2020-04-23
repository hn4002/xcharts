const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [{
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: false,
        overlay: true,
        port: 7080,
        host: '0.0.0.0',
        disableHostCheck: true,
        //sockHost: 'streamer.hnsib.net',
        //sockPort: 443,
        //sockPath: '/streamer/xcharts/sockjs-node',
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
}
