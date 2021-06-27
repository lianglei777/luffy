const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分析包大小工具
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// dayjs 替换momentjs , 减小包大小 560k --> 5k
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
    mode: 'development', // 开发环境 development、production
    entry: './src/index.js',
    // devtool: 'inline-source-map', // 生产环境关掉
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true, // 运行时自动打开浏览器
        compress: true, // 启用gzip压缩
        // stats: 'errors-only', // 终端仅打印 error
        port: 9000, // 端口
        hot: true, // 热更新
    },
    output: {
        filename: 'index.[hash:8].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // 每次打包前自动清理dist文件夹
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(tsx|js)?$/,
                // 开启缓存
                options: {
                    cacheDirectory: true,
                },
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    // 为了解决引入antd样式解析编译失败，需要改为以下写法,添加配置
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true, // https://github.com/ant-design/ant-design/issues/7927#issuecomment-400368810
                                // 严格数学计算关闭，不然antd样式编译报错
                                strictMath: false, // https://github.com/ant-design/ant-design/pull/17375
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|mp4|avi|mp3|MOV)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // html模板的生成路径, 文件名称,  路径基于 output 中的path 路径
            template: path.resolve('./index.html'), //html模板, 从根目录开始
            inject: true, // true：默认值，script标签位于html文件的 body 底部
        }),
        // new BundleAnalyzerPlugin(),
        new AntdDayjsWebpackPlugin(),
    ],
    // externals: {
    //     react: 'React',
    //     'react-dom': 'ReactDOM',
    // },

    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
}
