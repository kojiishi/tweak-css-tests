var gulp = require('gulp'),
    insert = require('gulp-insert'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var source = 'tweak-css-tests.js';
var bookmarklet = 'bookmarklet.js';

gulp.task('bookmarklet', function () {
    return gulp.src(source)
        .pipe(uglify())
        .pipe(insert.prepend('javascript:'))
        .pipe(rename(bookmarklet))
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function () {
    gulp.watch(source, ['bookmarklet']);
});

gulp.task('default', ['bookmarklet']);
