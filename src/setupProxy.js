const { createProxyMiddleware } = require('http-proxy-middleware');
// import proxy from "http-proxy-middleware"



module.exports = (app) => {
  // export const setupProxy = (app) => {
  const proxyList = [
    '/land-api/user',
    '/land-api/system',
    '/land-api/mosaic',
    '/land-api/mosaic/task/ortho',
    '/land-api/mosaic/task/ai',
    '/land-api/download',
    
    '/land-api/data',
    '/land-api/test'
  ];

  app.use(
    createProxyMiddleware(proxyList, {
      // proxy(proxyList, {
      target: process.env.REACT_APP_SERVER_PATH,
      changeOrigin: true,
      xfwd: true
    })
  );

  /*
  app.use(
    createProxyMiddleware(proxyList, {
      target: process.env.REACT_APP_GEOSERVER_URL,
      changeOrigin: true,
      xfwd: true
    })
  );
  */
}
