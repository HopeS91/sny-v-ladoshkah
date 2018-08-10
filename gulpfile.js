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
const remember = require('gulp-remember');
const path = require('path');
const cached = require('gulp-cached');

gulp.task('css', function() {
	const plugins = [
		autoprefixer({browsers: ['last 3 version']})
	];

	return gulp.src('src/css/*.css')
		.pipe(debug({title: 'src:'}))
		.pipe(cached('css'))
		.pipe(debug({title: 'cached:'}))
		.pipe(postcss(plugins))
		.pipe(debug({title: 'autoprefixer:'}))
		.pipe(remember('css'))
		.pipe(debug({title: 'remember:'}))
		.pipe(concatCss('style.css'))
		.pipe(debug({title: 'concatCss:'}))
		.pipe(uglifycss({"uglyComments": true}))
		.pipe(debug({title: 'uglifycss:'}))
		.pipe(gulp.dest('src/src'));
});

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe(debug({title: 'src:'}))
		.pipe(cached('js'))
		.pipe(debug({title: 'cached:'}))
		.pipe(babel({presets: ['env']}))
		.pipe(debug({title: 'babel:'}))
		.pipe(remember('js'))
		.pipe(debug({title: 'remember:'}))
		.pipe(concat('script.js'))
		.pipe(debug({title: 'concatjs:'}))
		.pipe(uglify())
		.pipe(debug({title: 'uglifyjs:'}))
		.pipe(gulp.dest('src/src'));
});

gulp.task('clean', function() {
	return del('src/src');
});

gulp.task('build', gulp.series(
	'clean', 
	gulp.parallel('css', 'js'))
);

gulp.task('watch', function() {
	gulp.watch('src/css/*.css', gulp.series('css')).on('unlink', function(filepath) {
		remember.forget('css', path.resolve(filepath));
		delete cached.caches.css[path.resolve(filepath)];
	});
	gulp.watch('src/js/*.js', gulp.series('js')).on('unlink', function(filepath) {
		remember.forget('js', path.resolve(filepath));
		delete cached.caches.js[path.resolve(filepath)];
	});
});

gulp.task('default', gulp.series('build', 'watch'));