// Modules
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const PostCssFlexbugsFixes = require('postcss-flexbugs-fixes');
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
// Variables
const outputDir = 'dist';
const publicDir = 'public';
const outputPath = path.resolve(__dirname, outputDir);
const indexFile = path.resolve(__dirname, publicDir, 'index.html');
const favIconFile = path.resolve(__dirname, publicDir, 'favicon.ico');
const webHost = process.env.NODE_WEB_HOST || 'localhost';
const webPort = process.env.NODE_WEB_PORT || 3000;
const apiHost = process.env.NODE_HOST || 'localhost';
const apiPort = process.env.NODE_API_PORT || 8080;
const apiUrl = `http://${apiHost}:${apiPort}`;
const publicPort = webPort == 80 ? '' : `:${webPort}`;
const publicHost = `${webHost}${publicPort}`;

module.exports = {
    entry: {
        app: ['./src/app/index.tsx'],
        vendor: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk']
    },
    output: {
        filename: 'main.bundle.js',
        path: outputPath,
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
        modules: ['node_modules']
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
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: 'postcss',
                            plugins: () => [
                                PostCssFlexbugsFixes,
                                autoprefixer({
                                    browsers: [
                                        '>1%',
                                        'last 4 versions',
                                        'Firefox ESR',
                                        'not ie < 9', // React doesn't support IE8 anyway
                                    ],
                                    flexbox: 'no-2009',
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    performance: {
        maxEntrypointSize: 1000000,
        maxAssetSize: 1000000
    },
    devtool: 'source-map',
    devServer: {
        port: webPort,
        historyApiFallback: true,
        public: publicHost,
        proxy: {
            '/api': apiUrl
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
