var gulp = require('gulp'),
    rename = require('gulp-rename'),
    artoo = require('gulp-artoo');

var source = 'tweak-css-tests.js';
var bookmarklet = 'bookmarklet.js';

gulp.task('bookmarklet', function () {
    return gulp.src(source)
        .pipe(artoo())
        .pipe(rename(bookmarklet))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch(source, ['bookmarklet']);
});

gulp.task('default', ['bookmarklet']);
