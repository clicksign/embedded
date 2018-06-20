const gulp = require('gulp'),
      jshint = require('gulp-jshint'),
      jasmineBrowser = require('gulp-jasmine-browser'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      del = require('del');

gulp.task('clean', function(done) {
  del(['build/**/*.js']);

  done();
});

gulp.task('jshint', function(done) {
  gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))

  done();
});

gulp.task('test', function(done) {
  return gulp.src(['src/**/*.js', 'spec/**/*_spec.js'])
    .pipe(jasmineBrowser.specRunner({ console: true }))
    .pipe(jasmineBrowser.headless({ driver: 'phantomjs' }));

  done();
});

gulp.task('build', gulp.series('clean', 'jshint', 'test', function(done) {
  gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(concat('embedded.js'))
    .pipe(gulp.dest('build'));

  done();
}));

gulp.task('default', gulp.series('jshint', 'test'));
