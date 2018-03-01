const gulp = require('gulp');
const webpack = require('webpack');
// const log = require('fancy-log');
const browserSync = require('browser-sync');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var proxy = require('http-proxy-middleware');

var api = proxy('/api/', {
  target: 'http://localhost:1234/',
  changeOrigin: true,
  logLevel: 'debug'
});

const webpackConf = require('./webpack.config');

function browserSyncWrapper(bundler) {
  browserSync({
    server: {
      baseDir: [ './dist' ],
      middleware: [
        api,
        webpackDevMiddleware(bundler, {
          publicPath: webpackConf.output.publicPath,
          stats: { colors: true }
        }),
        webpackHotMiddleware(bundler)
      ]
    },
    files: [
      'src/**/*.css',
      'src/**/*.html'
    ]
  })
}


gulp.task('webpack:dev', () => {
  const bundle = webpack({...webpackConf, mode: 'development'});
  // bundle.watch(200, webpackWrapper(done))
  browserSyncWrapper(bundle);
});
gulp.task('webpack:build', () => {
  const bundle = webpack({...webpackConf, mode: 'production'});
  browserSyncWrapper(bundle);
  // bundle.run(webpackWrapper(done))
})
