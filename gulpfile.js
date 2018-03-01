const gulp = require('gulp');
const webpack = require('webpack');
const log = require('fancy-log');
const webpackConf = require('./webpack.config');

function webpackWrapper(done) {
  return (error, status) => {
    log(status.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false
    }));
    if (error) {
      log.error('webpack', error.toString());
      this.emit('end');
    }
    if (done) {
      done();
    }
  }
}


gulp.task('webpack:dev', done => {
  const bundle = webpack({...webpackConf, mode: 'development'});
  bundle.watch(200, webpackWrapper(done))
});
gulp.task('webpack:build', done => {
  const bundle = webpack({...webpackConf, mode: 'production'});
  bundle.run(webpackWrapper(done))
})
