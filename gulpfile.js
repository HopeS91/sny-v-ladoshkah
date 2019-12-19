'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concatCss = require('gulp-concat-css');
const uglifycss = require('gulp-uglifycss');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cached = require('gulp-cached');
const remember = require('gulp-remember');
const del = require('del');
const browserSync = require('browser-sync').create();

gulp.task('html', function() {
  return gulp.src('./src/assets/*.html')
    .pipe(cached('html'))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(remember('html'))
    .pipe(gulp.dest('./public'));
});

gulp.task('img', function() {
  return gulp.src('./src/assets/images/**/*.*')
    .pipe(cached('img'))
    .pipe(imagemin())
    .pipe(remember('img'))
    .pipe(gulp.dest('./public/images'));
});

gulp.task('css', function() {
  return gulp.src('./src/css/*.css')
    .pipe(cached('css'))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(remember('css'))
    .pipe(concatCss('style.css'))
    .pipe(uglifycss({ "uglyComments": true }))
    .pipe(gulp.dest('./public'));
});

gulp.task('js', function() {
  return gulp.src([
      'node_modules/@babel/polyfill/dist/polyfill.js',
      './src/js/*.js'
    ])
    .pipe(cached('js'))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(remember('js'))
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public'));
});

gulp.task('clean', function() {
  return del('./public');
});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('html', 'img', 'css', 'js'))
);

gulp.task('watch', function() {
  const htmlWatcher = gulp.watch('./src/assets/*.html', gulp.series('html'));

  htmlWatcher.on('change', function(event) {
    if (event.type === 'deleted') {
      delete cached.caches['html'][event.path];
      remember.forget('html', event.path);
    }
  });

  const imgWatcher = gulp.watch('./src/assets/images/*.*', gulp.series('img'));

  imgWatcher.on('change', function(event) {
    if (event.type === 'deleted') {
      delete cached.caches['img'][event.path];
      remember.forget('img', event.path);
    }
  });

  const cssWatcher = gulp.watch('./src/css/*.css', gulp.series('css'));

  cssWatcher.on('change', function(event) {
    if (event.type === 'deleted') {
      delete cached.caches['css'][event.path];
      remember.forget('css', event.path);
    }
  });

  const jsWatcher = gulp.watch('./src/js/*.js', gulp.series('js'));

  jsWatcher.on('change', function(event) {
    if (event.type === 'deleted') {
      delete cached.caches['js'][event.path];
      remember.forget('js', event.path);
    }
  });
});

gulp.task('server', function() {
  browserSync.init({
    server: './public'
  });

  browserSync.watch('./public/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(
  'build',
  gulp.parallel('watch', 'server'))
);
