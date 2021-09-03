const {merge} = require('webpack-merge');
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const deps = require("./../package.json").dependencies;
const commonConfig = require('./webpack.common');
const dotenv = require("dotenv");

const {REACT_APP_DEV_DOMAIN_NAME} = dotenv.config().parsed;

const config = {
    output: {
        publicPath: `${REACT_APP_DEV_DOMAIN_NAME}:7001/`,
        chunkFilename: "[id].[contenthash].js"
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "host",
            // shared: ["react", "react-dom"]
            filename: "remoteEntry.js",
            exposes: {

            },
            remotes: {
                core: `core@${REACT_APP_DEV_DOMAIN_NAME}:7003/remoteEntry.js`,
                common: `common@${REACT_APP_DEV_DOMAIN_NAME}:7002/remoteEntry.js`
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
