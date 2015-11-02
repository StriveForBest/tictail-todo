'use strict';

// requirements

var browserify = require('gulp-browserify');
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var path = require('path');
var rimraf = require('gulp-rimraf');
var size = require('gulp-size');
var watchLess = require('gulp-watch-less');

// tasks

gulp.task('build-js', function () {
  return gulp.src('./todo/static/scripts/jsx/main.js')
    .pipe(browserify({transform: ['reactify']}))
    .pipe(gulp.dest('./todo/static/scripts/js'))
    .pipe(size());
});

gulp.task('clean-js', function () {
  return gulp.src(['./todo/static/scripts/js'], {read: false})
    .pipe(rimraf());
});

gulp.task('clean-css', function () {
  return gulp.src(['./todo/static/stylesheets/css'], {read: false})
    .pipe(rimraf());
});

gulp.task('clean', ['clean-js', 'clean-css']);

gulp.task('build-less', function () {
  return gulp.src('./todo/static/stylesheets/less/main.less')
    .pipe(watchLess('less/file.less'))
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./todo/static/stylesheets/css'));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build-js', 'build-less');
  gulp.watch('./todo/static/scripts/jsx/main.js', ['build-js']);
  gulp.watch('./todo/static/stylesheets/less/**/*.less', ['build-less']);
});
