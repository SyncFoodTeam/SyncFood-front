const { createProxyMiddleware } = require('http-proxy-middleware');
const proxyApi = {
    target: 'http://localhost:5000',
    changeOrigin: true
}

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware(proxyApi)
  );
};

