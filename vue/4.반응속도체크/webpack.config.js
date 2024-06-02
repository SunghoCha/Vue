const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue']
    },
    entry: {
        app: path.join(__dirname, 'main.js'),
    },
    module: { // loader들이 js가 아닌애들을 js로 변환해줌
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader',
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ]   
        }],
    },
    plugins: [ // output으로 나오기 전에 부가적인 처리 해줌
        new VueLoaderPlugin(),
    ],
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
};