require('dotenv-extended').config();
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './client/index.html',
    filename: './index.html'
});

module.exports = {
    mode: process.env.NODE_ENV,
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
            assets: path.resolve(__dirname, './client/assets'),
            components: path.resolve(__dirname, './client/components'),
            shell: path.resolve(__dirname, './client/App/Shell/'),
            clientCommon: path.resolve(__dirname, './client/common'),
            common: path.resolve(__dirname, './common'),
            stores: path.resolve(__dirname, './client/Stores')
        },
        extensions: ['*', '.js', '.jsx']
    },
    entry: {
        app: './client/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './dist',
        hot: true,
        compress: true,
        port: process.env.WEBPACK_PORT,
        proxy: {
            '/api': `http://localhost:${process.env.PORT}`,
            '/auth': `http://localhost:${process.env.PORT}`
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        htmlPlugin
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/client'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',

                    // Translates CSS into CommonJS
                    'css-loader',

                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf|mp3)$/,
                use: [
                    'file-loader',
                ],
            },
        ]
    }
};