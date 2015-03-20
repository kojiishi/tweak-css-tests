var gulp = require('gulp'),
    rename = require('gulp-rename'),
    artoo = require('gulp-artoo');

gulp.task('bookmarklet', function () {
    return gulp.src('webkit-prefixer.js')
        .pipe(artoo())
        .pipe(rename('webkit-prefixer-bookmarklet.js'))
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['bookmarklet'], function () {
});
