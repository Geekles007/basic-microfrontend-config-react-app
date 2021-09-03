const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const deps = require("./../package.json").dependencies;
const commonConfig = require('./webpack.common');
const dotenv = require("dotenv");

const {REACT_APP_DEV_DOMAIN_NAME} = dotenv.config().parsed;

const config = {
    output: {
        publicPath: `${REACT_APP_DEV_DOMAIN_NAME}:7003/`,
        chunkFilename: "[id].[contenthash].js"
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "core",
            // shared: ["react", "react-dom"]
            filename: "remoteEntry.js",
            exposes: {

            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            }
        }),
    ],
};

module.exports = merge(commonConfig, config);
