var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

var original_js_path = 'static/js/**/*.js',
    final_js_file_name = 'dist_js.min.js',
    dist_js_path = 'dist/js';

var sass_path = 'static/sass/**/*.scss',
    final_css_file_name = 'dist_css.min.css',
    dist_css_path = 'dist/css';

gulp.task('sass', function () {
    return sass(sass_path)
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(concat(final_css_file_name))
        .pipe(minifycss())
        .pipe(gulp.dest(dist_css_path));
});

gulp.task('watch', function () {
    gulp.watch(sass_path, ['sass']);
    gulp.watch(original_js_path, ['scripts']);
});

gulp.task('scripts', function () {
    return gulp.src(original_js_path)
        .pipe(concat(final_js_file_name))
        .pipe(uglify())
        .pipe(gulp.dest(dist_js_path));
});