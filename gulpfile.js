const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concatCss = require('gulp-concat-css');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const pump = require('pump');

gulp.task('autoprefixer', function () {
	const plugins = [
		autoprefixer({browsers: ['last 1 version']})
	];

	return gulp.src('./src/css/*.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('./src/css'));
});

gulp.task('concatcss', function () {
  return gulp.src('./src/css/*.css')
    .pipe(concatCss('style.css'))
    .pipe(gulp.dest('./src'));
});

gulp.task('uglifycss', function (callback) {
	gulp.src('style.css')
		.pipe(uglifycss({
			"uglyComments": true
	}))
		.pipe(gulp.dest('./src'));
		callback();
});

gulp.task('concatjs', function () {
	return gulp.src('./src/js/*.js')
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./src'));
});

gulp.task('babel', () =>
	gulp.src('script.js')
		.pipe(babel({
		presets: ['env']
	}))
		.pipe(gulp.dest('./src'))
);

gulp.task('uglifyjs', function (cb) {
	pump([
		gulp.src('script.js'),
		uglify(),
		gulp.dest('./src')
	],
		cb
	);
});