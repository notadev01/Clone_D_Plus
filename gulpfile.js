const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

function minifyJs() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'))
}

function compileSass() {
    return gulp.src('./src/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/styles'))
}

exports.sass = compileSass;
exports.minify = minifyJs;
exports.images = minifyImages;

exports.default = function() {
    gulp.watch('./src/styles/*.scss', { ignoreInitial: false }, gulp.series(compileSass));
    gulp.watch('./src/scripts/*.js', { ignoreInitial: false }, gulp.series(minifyJs));
}