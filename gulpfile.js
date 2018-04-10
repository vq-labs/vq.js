const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');

gulp.task('dev', function() {
    const tsResult = gulp
        .src('src/**/*.ts')
        .pipe(ts({
            declaration: true
        }));
        
    return merge([
        tsResult.dts.pipe(gulp.dest('temp/definitions')),
        tsResult.js.pipe(gulp.dest('temp/js'))
    ]);   
});

gulp.task('build', function() {
    return gulp
        .src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build'));
});

gulp.task('watch', ['dev'], function() {
    gulp.watch('src/**/*.ts', ['dev']);
});