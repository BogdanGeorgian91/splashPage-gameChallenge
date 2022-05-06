const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassGlob = require('gulp-sass-glob');
const del = require('del');

gulp.task('styles', () => {
    return gulp.src('./sass/styles.scss')
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest('./css'));
});

gulp.task('clean', () => {
    return del([
        'css/styles.css',
    ]);
});

gulp.task('default', gulp.series([ 'clean', 'styles' ]));

const compileSass = (done) => {
    gulp.series([ 'clean', 'styles' ])(done);
}

gulp.task('watch', () => {
    gulp.watch('sass/**/*.scss', compileSass);
});