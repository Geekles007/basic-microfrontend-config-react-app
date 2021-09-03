const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index',
    mode: "development",
    module: {
        rules: [
            {
                test: /bootstrap\.tsx$/,
                loader: "bundle-loader",
                options: {
                    lazy: true,
                },
            },
            {
                test: /\.tsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-react", "@babel/preset-typescript"],
                },
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    stats: {
        errorDetails: true
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: '0.0.0.0',
        port: 7003,
        historyApiFallback: true,
        watchContentBase: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        })
    ]
}