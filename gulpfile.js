const gulp = require('gulp');
const debug = require('gulp-debug');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const concatCss = require('gulp-concat-css');
const uglifycss = require('gulp-uglifycss');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');

gulp.task('css', function() {
	const plugins = [
		autoprefixer({browsers: ['last 3 version']})
	];

	return gulp.src('src/css/*.css')
		.pipe(debug({title: 'src:'}))
		.pipe(concatCss('style.css'))
		.pipe(debug({title: 'concatCss:'}))
		.pipe(postcss(plugins))
		.pipe(debug({title: 'autoprefixer:'}))
		.pipe(uglifycss({"uglyComments": true}))
		.pipe(debug({title: 'uglifycss:'}))
		.pipe(gulp.dest('src/src'));
});

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe(debug({title: 'src:'}))
		.pipe(concat('script.js'))
		.pipe(debug({title: 'concatjs:'}))
		.pipe(babel({presets: ['env']}))
		.pipe(debug({title: 'babel:'}))
		.pipe(uglify())
		.pipe(debug({title: 'uglifyjs:'}))
		.pipe(gulp.dest('src/src'));
});

gulp.task('clean', function() {
	return del('src/src');
});

gulp.task('build', gulp.series('clean', 'css', 'js'));