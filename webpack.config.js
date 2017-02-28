var webpack = require("webpack"),
    path = require("path"),
    lessPluginGlob = require('less-plugin-glob');

module.exports = {
    entry: {
        "vops-layout.browser": "./src/index.ts",
        "demo.browser": "./demo/index.ts"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.html', '.less', '.css']
    },
    devtool: "inline-source-map",
    module: {
        rules: [{
            test: /\.ts?$/,
            loader: 'awesome-typescript-loader'
        }, {
            test: /\.less?$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'less-loader',
                    options: {
                        lessPlugins: [lessPluginGlob]
                    }
                }
            ]
        }, {
            test: /\.html?$/,
            loader: 'html-loader?exportAsEs6Default'
        }]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            test: /\.ts$/i
        })
    ]
}