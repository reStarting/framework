const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const log = require('fancy-log');
const browserSync = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const filter = require('gulp-filter');
var proxy = require('http-proxy-middleware');

const webpackConf = require('./webpack.config');
const { paths } = require('./config');

var api = proxy('/api/', {
  target: 'http://localhost:1234/',
  changeOrigin: true,
  logLevel: 'debug'
});

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



function browserSyncWrapper(bundler) {
  browserSync({
    server: {
      baseDir: [ paths.dist ],
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

let PRODUCTION = false;

gulp.task('webpack:dev', () => {
  webpackConf.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  webpackConf.entry.unshift('webpack/hot/dev-server', 'webpack-hot-middleware/client');
  const bundle = webpack({...webpackConf, mode: 'development'});
  // bundle.watch(200, webpackWrapper(done))
  browserSyncWrapper(bundle);
});
gulp.task('webpack:build', done => {
  PRODUCTION = true;
  const bundle = webpack({...webpackConf, mode: 'production'});
  bundle.run(webpackWrapper(done))
})

gulp.task('copy', () => {
  const fileFilter = filter(file => file.stat.isFile());
  return gulp.src([
    path.join(paths.src, '/assets/public/**/*'),
  ])
    .pipe(fileFilter)
    .pipe(gulp.dest(PRODUCTION ? paths.dist : paths.tmp));
});

gulp.task('dev', gulp.series('webpack:dev', 'copy'))
gulp.task('build', gulp.series('webpack:build', 'copy'))

gulp.task('default', gulp.series(['build']));

