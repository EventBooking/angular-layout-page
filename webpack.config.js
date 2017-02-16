var webpack = require("webpack"),
    path = require("path"),
    lessPluginGlob = require('less-plugin-glob');

module.exports = {
    entry: {
        "vops-layout.browser": "./src/app.ts"
    },
    output: {
        path: path.join(__dirname, "demo"),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.html', '.less', '.css']
    },
    devtool: "inline-source-map",
    module: {
        loaders: [{
            test: /\.ts?$/,
            loader: 'awesome-typescript-loader'
        }, {
            test: /\.less?$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader',
                'import-glob'
            ]
        }, {
            test: /\.html?$/,
            loader: 'html-loader?exportAsEs6Default'
        }]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            test: /\.ts$/i
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
    ]
}