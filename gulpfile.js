/* Gulp test file */

// Tools
let gulp     = require('gulp');
let concat   = require('gulp-concat');
let cleanCss = require('gulp-clean-css');
let jshint   = require('gulp-jshint');
let minify   = require('gulp-minify');
let uglify   = require('gulp-uglify-es').default;

/* FACTSET + ini */

// Task Style
let strFSCssSrc  = ['css/styleFSCurrencyConverter.css'];
let strFSCssDest = 'css/';
gulp.task('tskFSStyle', function () {
    return gulp.src(strFSCssSrc)
               .pipe(concat('styleFSCurrencyConverter.min.css'))
               .pipe(cleanCss({level: {1: {specialComments: 0}}}))
               .pipe(gulp.dest(strFSCssDest))
});

// Task Js
let strFSJsSrc  = (['js/jFactSetLanguages.js', 'js/jFactSetRatesInput.js', 'js/jFactSetCurrencyConverter.js']);
let strFSJsDest = 'js/';
gulp.task('tskFSJs', function () {
    return gulp.src(strFSJsSrc)
               .pipe(concat('jFactSetCurrencyConverter.min.js'))
               .pipe(jshint())
               .pipe(uglify())
               .pipe(gulp.dest(strFSJsDest))
});

// FACTSET Task
gulp.task('tskFactSet', async function () {
    gulp.series(['tskFSStyle', 'tskFSJs']);
});

// Task Watch
gulp.task('tsFSkWatch', function () {
    gulp.watch(['js/jFactSetRatesInput.js', 'js/jFactSetCurrencyConverter.js', 'css/styleFSCurrencyConverter.css'],
        gulp.series(['tskFSStyle', 'tskFSJs']));
});

/* FACTSET - fin */