/**
 * Created by Craig on 07/02/2016.
 */

var gulp = require('gulp');
var webpack = require('webpack-stream');
var rename = require('gulp-rename');
var ghPages = require('gulp-gh-pages');

gulp.task('deploy', ['default'], function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', function() {
  var bundle = gulp.src('app/main.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('dist/'));

  var html = gulp.src('app/index.html')
    .pipe(rename({ dirname: '' }))
    .pipe(gulp.dest('dist/'));

  return Promise.all([bundle, html]);
});
