'use strict';

// requirements
var browserify = require('gulp-browserify');
var exit = require('gulp-exit');
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var path = require('path');
var rimraf = require('gulp-rimraf');
var size = require('gulp-size');
var watchLess = require('gulp-watch-less');

// TODO:: pipe tasks with `exit()`

// tasks
gulp.task('cleanJs', function() {
  return gulp.src(['./todo/static/scripts/js'], {read: false})
    .pipe(rimraf());
});

gulp.task('cleanCss', function() {
  return gulp.src(['./todo/static/stylesheets/css'], {read: false})
    .pipe(rimraf());
});

gulp.task('clean', ['cleanJs', 'cleanCss']);

gulp.task('buildJs', function() {
  return gulp.src('./todo/static/scripts/jsx/main.js')
    .pipe(browserify({transform: ['reactify']}))
    .pipe(gulp.dest('./todo/static/scripts/js'))
    .pipe(size());
});

gulp.task('buildLess', function() {
  return gulp.src('./todo/static/stylesheets/less/main.less')
    .pipe(watchLess('less/file.less'))
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./todo/static/stylesheets/css'));
});

gulp.task('build', ['buildJs', 'buildLess']);

gulp.task('default', ['clean', 'buildJs', 'buildLess']);

gulp.task('watch', function() {
  gulp.watch('./todo/static/scripts/jsx/main.js', ['buildJs']);
  gulp.watch('./todo/static/stylesheets/less/**/*.less', ['buildLess']);
});
