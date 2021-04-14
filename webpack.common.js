const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // 开发环境 development、production
    entry: './src/index.js',
    devtool: 'inline-source-map', // 生产环境关掉
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true,
        // contentBase: './dist',
        compress: true,
        port: 9000,
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // 每次打包前自动清理dist文件夹
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                // 开启缓存
                options: {
                    cacheDirectory: true
                },
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // html模板的生成路径, 文件名称,  路径基于 output 中的path 路径
            template: path.resolve('./index.html'), //html模板, 从根目录开始
            inject: true, // true：默认值，script标签位于html文件的 body 底部
        }),
    ],
};