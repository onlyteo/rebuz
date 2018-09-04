// Modules
const path = require('path');
const webpack = require('webpack');
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
// Variables
const outputDir = 'dist';
const publicDir = 'public';
const outputPath = path.resolve(__dirname, outputDir);
const indexFile = path.resolve(__dirname, publicDir, 'index.html');
const favIconFile = path.resolve(__dirname, publicDir, 'favicon.ico');

module.exports = {
    entry: {
        app: ['./src/app/index.tsx'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: outputPath,
        filename: 'main.bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader'
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader'
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development', // use 'development' unless process.env.NODE_ENV is defined
            DEBUG: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            template: indexFile,
            favicon: favIconFile
        })
    ]
}
