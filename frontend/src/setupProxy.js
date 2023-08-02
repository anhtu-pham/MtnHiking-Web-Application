const { createProxyMiddleware } = require("http-proxy-middleware");

const proxyMiddleware = (app) => {
    app.use("/", createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true
    }));
};

module.exports = proxyMiddleware;