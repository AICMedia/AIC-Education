'use strict';

const gulp = require('gulp'),
	  sass = require('gulp-sass'),
	  sourcemaps = require('gulp-sourcemaps'),
	  del = require('del'),
	  gulpIf = require('gulp-if'),
	  cssnano = require('gulp-cssnano'),
	  imagemin = require('gulp-imagemin'),
	  rigger = require('gulp-rigger'),
	  autoprefixer = require('gulp-autoprefixer');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function () {
	return gulp.src('src/sass/main.scss')
		.pipe(gulpIf(isDevelopment, sourcemaps.init()))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulpIf(!isDevelopment, cssnano()))
		.pipe(gulpIf(isDevelopment, sourcemaps.write()))
		.pipe(gulp.dest('build/css'));
});

gulp.task('images', function() {
	return gulp.src('src/images/**/*.*', {since: gulp.lastRun('images')})
		.pipe(gulpIf(!isDevelopment, imagemin()))
		.pipe(gulp.dest('build/images/'));
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*.*', {since: gulp.lastRun('fonts')})
		.pipe(gulp.dest('build/fonts/'));
});


gulp.task('assets', function() {
	return gulp.src('src/*.html', {since: gulp.lastRun('assets')})
		.pipe(gulp.dest('build/'));
});

gulp.task('js', function() {
	return gulp.src('src/js/{main,vendor}.js', {since: gulp.lastRun('js')})
		.pipe(rigger())
		.pipe(gulp.dest('build/js/'));
});

gulp.task('clean', function() {
	return del('build');
});

gulp.task('build', gulp.series(
	'clean',
	gulp.parallel('styles', 'fonts', 'assets', 'images', 'js')
));

gulp.task('watch', function() {
	gulp.watch('src/sass/**/*.scss', gulp.series('styles'));

	gulp.watch('src/images/**/*.*', gulp.series('images'));

	gulp.watch('src/fonts/**/*.*', gulp.series('fonts'));

	gulp.watch('src/*.html', gulp.series('assets'));

	gulp.watch('src/js/**/*.js', gulp.series('js'));
});

gulp.task('dev', gulp.series('build', 'watch'));