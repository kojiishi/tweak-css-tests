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

gulp.task('bookmarklet-html', ['bookmarklet'], function () {
    return gulp.src('bookmarklet.html')
        .pipe(replace(/(<a href=")[^"]*/, '$1' + escape(fs.readFileSync(bookmarklet))))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch(source, ['bookmarklet', 'bookmarklet-html']);
});

gulp.task('default', ['bookmarklet', 'bookmarklet-html']);
