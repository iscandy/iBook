module.exports = {
    outputDir: '../docs',
    publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
    devServer: {
        contentBase: './public',
        proxy: {
            "/api": {
                target: "http://bl.7yue.pro/v1/",
                secure: false, // 如果是https接口，需要配置这个参数
                ws: true,
                changeOrigin: true, // 是否跨域
                bypass: function(req, res, proxyOptions) {
                    //对请求头处理
                    // req.headers.referer='https://y.qq.com'
                    // req.headers.host='c.y.qq.com'
                },
                pathRewrite: { // 重写地址
                    　　　　　
                    '^/api': ''
                }
            },
            //其他的代理的配置
        }
    }
}