module.exports = {
    devServer: {
    	host: '0.0.0.0',
        port: 8080,
    	hot: true,
    	disableHostCheck: true,
        proxy: {
            "/api": {
                target: "http://0.0.0.0:80",
                secure: false
            }
        }
    },
    pages: {
        analysis: {
            entry: 'src/pages/analysis/analysis.js',
            template: 'public/analysis.html',
            filename: 'analysis.html',
            title: 'Analysis',
            chunks: ['chunk-vendors', 'chunk-common', 'analysis']
        }
    }
};