var gulp = require('gulp'),
    artoo = require('gulp-artoo'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var source = 'tweak-css-tests.js';
var bookmarklet = 'bookmarklet.js';

gulp.task('bookmarklet', function () {
    return gulp.src(source)
        .pipe(uglify())
        .pipe(artoo())
        .pipe(rename(bookmarklet))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch(source, ['bookmarklet']);
});

gulp.task('default', ['bookmarklet']);
