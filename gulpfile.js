var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpackConfigDev = require('./webpack.dev.config.js');
var webpackConfigProd = require('./webpack.prod.config.js');
var webpack = require('webpack');
var gutil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');

gulp.task('watch', ['compile-js-dev'], function() {
  gulp.watch('src/scripts/**/*.js', ['compile-js-dev']);
});


gulp.task('compile-js-dev', function(callback) {
  return gulp.src('src/scripts/*.js')
    .pipe(webpackStream(webpackConfigDev))
    .on('error', swallowError)
    .pipe(gulp.dest('build/'))
});

gulp.task('compile-js-prod', function(callback) {
  return gulp.src('src/scripts/*.js')
    .pipe(webpackStream(webpackConfigProd))
    .on('error', swallowError)
    .pipe(gulp.dest('build/'))
});

gulp.task('default', ['watch']);
gulp.task('prod', ['compile-js-prod']);

function swallowError (error) {
  console.log(error.toString())
  this.emit('end')
}
