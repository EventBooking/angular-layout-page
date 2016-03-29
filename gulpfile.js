/* global require, __dirname */
var gulp = require('gulp'),
    debug = require('gulp-debug'),
    concat = require('gulp-concat'),
    project = require('./package.json'),
    dest = 'dist';

gulp.task('clean', clean);
gulp.task('default', ['clean'], build);
gulp.task('styles', styles);
gulp.task('html', html);

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
        .pipe(less({
            plugins: [require('less-plugin-glob')]
        }))
        .pipe(autoprefixer())
        .pipe(concat(project.name + '.css'))
        .pipe(gulp.dest(dest));
}

function build() {
    styles();
    html();
}