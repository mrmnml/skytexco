var
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    vendors = {
        js: [
            'node_modules/angular/angular.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/img-slider/js/imgslider.js',
            'node_modules/tether/dist/js/tether.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
        ],
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'node_modules/img-slider/css/imgslider.css',
        ]
    };


gulp.task('jshint', function () {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
});
gulp.task('app-less', function () {
    return gulp.src('src/*.less')
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist'))
});
gulp.task('app-js', function () {
    return gulp.src('src/*.js')
        .pipe(concat('app.js'))
        //only uglify if gulp is ran with '--type production'
        .pipe(gulp.dest('dist'))
});
gulp.task('vendors-css', function () {
    return gulp.src(vendors.css)
        .pipe(concat('vendors.css'))
        .pipe(cleancss())
        .pipe(gulp.dest('dist'))
});
gulp.task('vendors-js', function () {
    return gulp.src(vendors.js)
        .pipe(concat('vendors.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});
gulp.task('php', function () {
    return gulp.src('src/*.php')
        .pipe(gulp.dest('dist'))
});
gulp.task('images', function () {
    return gulp.src('src/images/**/*.jpg', {base: 'src'})
        .pipe(imagemin([imagemin.jpegtran()]))
        .pipe(gulp.dest('dist'))
});

/* updated watch task to include sass */

gulp.task('default', ['complete'], function () {
    gulp.watch('src/*.js', ['app-js']);
    gulp.watch('src/*.less', ['app-less']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/*.php', ['php']);
});
gulp.task('app', ['app-less', 'app-js', 'html', 'php', 'images']);
gulp.task('vendors', ['vendors-css', 'vendors-js']);
gulp.task('complete', ['app', 'vendors']);