const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 8',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];

module.exports = {
    plugins: [
        // 此配置的意思是，在中国使用率超过0.15%的浏览器，均使用autoprefixer进行添加前缀
        // 详见 https://github.com/postcss/autoprefixer#readme
        require('autoprefixer')({ overrideBrowserslist: ['> 0.15% in CN']})
    ],
};