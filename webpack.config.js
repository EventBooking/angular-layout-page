var webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    buildConfig = require('./webpack.build.config');

module.exports = {
    entry: {
        "demo": "./demo/index.ts"
    },
    output: buildConfig.output,
    resolve: buildConfig.resolve,
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true
    },
    module: buildConfig.module,
    plugins: [
        new webpack.SourceMapDevToolPlugin({ test: /\.ts$/i }),
        new ExtractTextPlugin({ filename: "[name].css", allChunks: true }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     minChunks: function (module) {
        //         // this assumes your vendor imports exist in the node_modules directory
        //         return module.context && module.context.indexOf('node_modules') !== -1;
        //     }
        // })
    ]
}