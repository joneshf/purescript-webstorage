'use strict'

var gulp       = require('gulp')
  , purescript = require('gulp-purescript')
  ;

var paths = {
    src: [ 'src/**/*.purs'
         , 'bower_components/purescript-*/src/**/*.purs'
         ]
}

gulp.task('compile', function() {
    return gulp.src(paths.src)
        .pipe(purescript.pscMake())
        .pipe(gulp.dest(''));
});

gulp.task('docs', function() {
    return gulp.src('src/**/*.purs')
      .pipe(purescript.docgen())
      .pipe(gulp.dest('README.md'));
});

gulp.task('default', ['compile', 'docs']);
