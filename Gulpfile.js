'use strict';
/* eslint-env node */

/**
 * module dependencies
 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var stringify = require('stringify');
var fs = require('fs-extra');
var glob = require('glob');
var through = require('through2');

// plugins
var CleanCss = require('less-plugin-clean-css');
var AutoPrefix = require('less-plugin-autoprefix');

/**
 * args
 */

var argv = require('minimist')(process.argv.slice(2), {
  boolean: ['watch'],
  alias: {
    w: 'watch'
  }
});

var lessWatched = false;
gulp.task('less', function() {
  gulp.src(__dirname + '/less/index.less')
    .pipe($.less({
      plugins: [
        new CleanCss(),
        new AutoPrefix({
          versions: ['last 10 versions']
        })
      ]
    }))
    .pipe(through.obj(function(row, enc, cb) {
      row.path = row.path.replace(/index\.css$/g, 'Aplayer.css');
      cb(null, row);
    }))
    .pipe(gulp.dest(__dirname + '/dist'));

  // enable watch when gulp less -w
  if (argv.watch && !lessWatched) {
    lessWatched = true;
    $.util.log('less watched');
    gulp.watch(__dirname + '/less/**/*.less', ['less']);
  }
});

var jsWatched = false;
gulp.task('js', function(cb) {
  // enable watch when gulp js -w
  if (argv.watch && !jsWatched) {
    jsWatched = true;
    $.util.log('js watched');
    gulp.watch([
      __dirname + '/lib/**/*.js',
      __dirname + '/lib/**/*.html'
    ], ['js']);
  }

  browserify(__dirname + '/lib/index')
    .transform(stringify(['.html']))
    .bundle(function(err, result) {
      if (!err && result) fs.outputFileSync(__dirname + '/dist/Aplayer.js', result);
      cb(err);
    });
});

gulp.task('clean', function() {
  fs.removeSync(__dirname + '/dist');
});


gulp.task('build', ['less', 'js']);