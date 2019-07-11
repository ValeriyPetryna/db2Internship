const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function style() {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function template() {
  return gulp
    .src('./src/**/*.pug')
    .pipe(
      pug({
        pretty: true
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

function imagesRendering() {
  return gulp
    .src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
}

async function build() {
  await style();
  await template();
  await imagesRendering();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    }
  });
  gulp.watch('./src/sass/**/*.scss', style);
  gulp.watch('./src/*.pug', template);
}

exports.style = style;
exports.template = template;
exports.imagesRendering = imagesRendering;
exports.build = build;
exports.watch = watch;
exports.default = build;
