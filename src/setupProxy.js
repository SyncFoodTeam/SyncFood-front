const { createProxyMiddleware } = require('http-proxy-middleware');
const proxyApi = {
    target: 'http://localhost:5132',
    changeOrigin: true
}

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(proxyApi)
  );
};

