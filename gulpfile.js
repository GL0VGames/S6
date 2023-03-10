var gulp = require('gulp'),
	gutil = require('gulp-util'),
	del = require('del'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	minifycss = require('gulp-minify-css'),
	minifyhtml = require('gulp-minify-html'),
	processhtml = require('gulp-processhtml'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	paths;

paths = {
	assets: 'src/assets/**/*',
	css:    'src/css/*.css',
	libs:   [
		'src/bower_components/phaser-official/build/phaser.min.js'
	],
	js:     ['src/js/**/*.js'],
	dist:   './dist/'
};

gulp.task('clean', function (cb) {
	del([paths.dist], cb);
});

gulp.task('copy-assets', function (done) {
	gulp.src("src/assets/**.png")
		.pipe(gulp.dest(paths.dist + 'assets'))
		.on('error', gutil.log);
	gulp.src("src/assets/backgrounds/**.png")
		.pipe(gulp.dest(paths.dist + 'assets/backgrounds'))
		.on('error', gutil.log);
	gulp.src("src/assets/face elements/**.png")
		.pipe(gulp.dest(paths.dist + 'assets/face elements'))
		.on('error', gutil.log);
	gulp.src("src/assets/effects/**.png")
		.pipe(gulp.dest(paths.dist + 'assets/effects'))
		.on('error', gutil.log);
	done();
});

gulp.task('copy-vendor', function () {
	return gulp.src(paths.libs)
		.pipe(gulp.dest(paths.dist))
		.on('error', gutil.log);
});

gulp.task('uglify', function () {
	return gulp.src(paths.js)
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(paths.dist))
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist));
});

gulp.task('minifycss', function () {
	return gulp.src(paths.css)
		.pipe(minifycss({
		keepSpecialComments: false,
		removeEmpty: true
	}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.dist))
		.on('error', gutil.log);
});

gulp.task('processhtml', function() {
	return gulp.src('src/index.html')
		.pipe(processhtml({}))
		.pipe(gulp.dest(paths.dist))
		.on('error', gutil.log);
});

gulp.task('minifyhtml', function() {
	return gulp.src('dist/index.html')
		.pipe(minifyhtml())
		.pipe(gulp.dest(paths.dist))
		.on('error', gutil.log);
});

gulp.task('lint', function() {
	return gulp.src(paths.js)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.on('error', gutil.log);
});

gulp.task('html', function(){
	return gulp.src('src/*.html')
		.pipe(connect.reload())
		.on('error', gutil.log);
});

gulp.task('connect', function (done) {
	connect.server({
		root: [__dirname + '/src'],
		port: 9000,
		livereload: true
	});
});

gulp.task('watch', function (done) {
	gulp.watch(['./src/index.html', paths.css, ...paths.js], gulp.series('html'));
	done();
});

gulp.task('default', gulp.series('connect', 'watch'));
gulp.task('build', gulp.series('copy-assets', 'copy-vendor', 'uglify', 'minifycss', 'processhtml', 'minifyhtml'));
