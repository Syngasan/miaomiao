module.exports = {
    // 静态资源路径
    publicPath: '/miaomiao',
    // 开发代理
    devServer: {
        proxy: {
            '/api2': {
                target: 'http://localhost:3000',
                changeOrigin: true
            },
            '/api': {
                target: 'http://39.97.33.178',
                changeOrigin: true
            }
        }
    },
    // webpack-bundle-analyzer配置
    chainWebpack: config => {
        if (process.env.npm_config_report) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
    }

}
