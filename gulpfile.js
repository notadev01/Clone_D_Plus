const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');

function minifyJs() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'))
}

function compileSass() {
    return gulp.src('./src/styles/main.scss')
        .pipe(replace('../../assets', '../assets'))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/styles'))
}

function compressImages() {
    return gulp.src('./src/images/**/*', { encoding: false })
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
}

function replaceHTML() {
    return gulp.src('./index.html')
        .pipe(replace('dist/', './'))
        .pipe(replace('assets/images', './images'))
        .pipe(gulp.dest('dist/'))
}

function copyFonts() {
    return gulp.src('./assets/fonts/*.woff2')
        .pipe(gulp.dest('./dist/assets/fonts'))
}

exports.sass = compileSass;
exports.minify = minifyJs;
exports.compress = compressImages;
exports.replace = replaceHTML;
exports.copyFonts = copyFonts;

exports.default = gulp.parallel(compileSass, minifyJs, compressImages, copyFonts, replaceHTML);

exports.watch = function () {
    gulp.watch('./src/styles/*.scss', { ignoreInitial: false }, gulp.series(compileSass));
    gulp.watch('./src/scripts/*.js', { ignoreInitial: false }, gulp.series(minifyJs));
    gulp.watch('./assets/images/**/*', { ignoreInitial: false }, gulp.series(compressImages));
    gulp.watch('./assets/fonts/*', { ignoreInitial: false }, gulp.series(copyFonts));
    gulp.watch('./index.html', { ignoreInitial: false }, gulp.series(replaceHTML));
}