var gulp = require('gulp'),
    artoo = require('gulp-artoo'),
    fs = require('fs'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
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

gulp.task('README', ['bookmarklet'], function () {
    return gulp.src('README.md')
        .pipe(replace(/(<a id="bookmarklet" href=")[^"]*/, '$1' + fs.readFileSync(bookmarklet)))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch(source, ['bookmarklet', 'README']);
});

gulp.task('default', ['bookmarklet', 'README']);
