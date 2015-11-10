'use strict'

var gulp       = require('gulp')
  , purescript = require('gulp-purescript')
  ;

var paths = {
    src: [ 'src/**/*.purs'
         , 'bower_components/purescript-*/src/**/*.purs'
         ]
  , ffi: [ 'src/**/*.js'
         , 'bower_components/purescript-*/src/**/*.js'
         ]
  }

gulp.task('compile', function() {
    return purescript.psc({
      src: paths.src
    , ffi: paths.ffi
    });
});

gulp.task('docs', function() {
    return purescript.pscDocs({
      src: paths.src
    , docgen: "Browser.WebStorage"
    }).pipe(gulp.dest('README.md'));
});

gulp.task('default', ['compile', 'docs']);
