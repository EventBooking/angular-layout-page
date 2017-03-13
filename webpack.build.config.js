var webpack = require("webpack"),
    path = require("path"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var rules = {
    fonts: {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=10000&name=fonts/[name].[ext]?[hash]'
    },
    styles: [
        {
            enforce: 'pre',
            test: /\.less?$/,
            use: ['import-glob-loader']
        },
        {
            test: /\.less?$/,
            use: ExtractTextPlugin.extract([
                'css-loader?importLoaders=1',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer')
                        ]
                    }
                },
                'less-loader'
            ])
        }
    ],
    typescript: {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader'
    },
    html: {
        test: /\.html?$/,
        loader: 'html-loader?exportAsEs6Default'
    }
};

module.exports = {
    entry: {
        "vops-layout": "./src/index.ts",
        "vendors": "./src/vendors.ts"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js', '.html', '.less', '.css']
    },
    devtool: "inline-source-map",
    module: {
        rules: [
            rules.fonts,
            ...rules.styles,
            rules.typescript,
            rules.html
        ]
    },
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