var gulp = require('gulp'),
    insert = require('gulp-insert'),
    uglify = require('gulp-uglify');

var source = ['tweak-css-tests.js', 'insert-tweak-css-tests.js'];

gulp.task('bookmarklets', function () {
    return gulp.src(source)
        .pipe(uglify())
        .pipe(insert.prepend('javascript:'))
        .pipe(gulp.dest('bookmarklets'));
});

gulp.task('watch', function () {
    gulp.watch(source, ['bookmarklets']);
});

gulp.task('default', ['bookmarklets']);
