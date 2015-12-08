var gulp = require('gulp');
var rollup = require('gulp-rollup');
var rename = require('gulp-rename');
var del = require('del');
var plumber = require('gulp-plumber');
var eslint = require('gulp-eslint');
var Server = require('karma').Server;

gulp.task('build', function() {
  gulp.src('src/runtime/index.js', {read: false})
    .pipe(plumber({
      handleError: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(rollup({ format: 'iife' }))
    .pipe(rename('intl-dom.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('lint', function() {
  gulp.src(['src/**/*.js'])
    .pipe(plumber({
      handleError: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(eslint())
    .pipe(eslint.format())
});
