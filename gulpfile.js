/* global require, __dirname */
var gulp = require('gulp'),
	debug = require('gulp-debug'),
	concat = require('gulp-concat'),
    project = require('./package.json'),
	dest = 'dist';

function exec(cmd, options, fn) {
	var proc = require('child_process').exec,
		child = proc(cmd, options, fn);

	child.stdout.on('data', function (data) {
		console.log(data);
	});

	child.stderr.on('data', function (data) {
		console.log(data);
	});
}

function clean() {
	var del = require('del');
	return del(dest);
}

gulp.task('clean', clean);

function html() {
	var html2js = require('gulp-ng-html2js');

	var options = {
		moduleName: 'ngLayoutPage',
		stripPrefix: 'directives'
	};

	gulp.src(['src/**/*.html'])
		.pipe(html2js(options))
		.pipe(concat(project.name + '.templates.js'))
		.pipe(gulp.dest(dest));
}

gulp.task('html', html);

function styles() {
	var less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer');

	gulp.src([
			'!src/assets.less',
			'!src/variables/variables.less',
			'!src/mixins/mixins.less',
			'src/**/*.less'
		])
		.pipe(concat(project.name + '.less'))
		.pipe(gulp.dest(dest));
		
	gulp.src([
			'src/variables/screen.less',
			'src/variables/theme.less',
			'src/variables/text.less',
			'src/variables/components.less'
		])
		.pipe(concat(project.name + '-variables.less'))
		.pipe(gulp.dest(dest));
		
	gulp.src([
			'src/mixins/text.less',
			'src/mixins/arrow.less',
			'src/mixins/layout.less',
			'src/mixins/divider.less'
		])
		.pipe(concat(project.name + '-mixins.less'))
		.pipe(gulp.dest(dest));
		
	gulp.src(['src/assets.less'])
		.pipe(debug())
		.pipe(less())
		.pipe(autoprefixer())
		.pipe(concat(project.name + '.css'))
		.pipe(gulp.dest(dest));
}

gulp.task('styles', styles);

function tsdInstall(callback) {
	var bundle = require('./tsd.json').bundle,
		del = require('del');

	del(bundle, function () {
		exec('tsd install', null, callback);
	});
}

gulp.task('tsd:install', tsdInstall);

function typescript(callback, watch) {
	var watchFlag = watch ? ' -w' : '';
	exec('tsc' + watchFlag + ' -p src', null, callback);
}

gulp.task('typescript', ['tsd:install'], function (callback) {
	typescript(callback);
});

gulp.task('typescript', typescript);

function server() {
	var express = require('express'),
		livereload = require('connect-livereload'),
		tinylr = require('tiny-lr'),
		path = require('path'),
		lrport = 35729;

	var listener = tinylr();
	listener.listen(lrport);

	function notifyLiveReload(event) {
		var config = {
			body: {
				files: [path.relative(__dirname, event.path)]
			}
		}
		listener.changed(config);
	}

	var app = express();
	app.use(livereload({ port: lrport }));
	
	app.use('/bower_components', express.static(__dirname + '/bower_components'));
	app.use('/dist', express.static(__dirname + '/dist'));
	app.use('/', express.static(__dirname + '/demo'));
	app.use('*', express.static(__dirname + '/demo'));

	watch();
	gulp.watch(['demo/**/*.css','dist/**/*.css'], notifyLiveReload);
	gulp.watch(['demo/**/*.js','dist/**/*.js'], notifyLiveReload);
	gulp.watch(['demo/**/*.html','dist/**/*.html'], notifyLiveReload);

	app.listen(4000);
}

gulp.task('server', server);

function watch() {
	gulp.watch(['src/**/*.less'], ['styles']);
	gulp.watch(['src/**/*.html'], ['html']);
	typescript(null, true);
}

gulp.task('watch', watch);

function build() {
	styles();
	html();
	typescript();
}

gulp.task('default', ['clean'], build);