const gulp = require('gulp');
const sass = require('gulp-sass')

gulp.task('sass', function(){
  return gulp.src('./app/**/*.sass')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./app'))
})

gulp.task('sass:watch', function(){
    gulp.watch('./app/**/*.scss', ['sass'])
  })
