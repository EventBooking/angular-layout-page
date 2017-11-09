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
gulp.task('watch', watch);

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

const less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    sourceFiles = project.name + '.less',
    variableFiles = project.name + '-variables.less',
    mixinsFiles = project.name + '-mixins.less',
    outputFile = project.name + '.css';

function getDest(fileName) {
    return `${dest}/${fileName}`;
}

function sources() {
    console.log(`Writing: ${sourceFiles}`);
    const sources = [
        '!src/assets.less',
        '!src/variables/variables.less',
        '!src/mixins/mixins.less',
        'src/**/*.less'
    ];
    return gulp.src(sources)
        .pipe(concat(sourceFiles))
        .pipe(gulp.dest(dest));
}

function variables() {
    console.log(`Writing: ${variableFiles}`);
    return gulp.src(['src/variables/**/*.less'])
        .pipe(debug({
            showFiles: true
        }))
        .pipe(concat(variableFiles))
        .pipe(gulp.dest(dest));
}

function mixins() {
    console.log(`Writing: ${mixinsFiles}`);
    return gulp.src(['src/mixins/**/*.less'])
        .pipe(debug({
            showFiles: true
        }))
        .pipe(concat(mixinsFiles))
        .pipe(gulp.dest(dest));
}

function css() {
    console.log(`Writing: ${outputFile}`);
    return gulp.src([getDest(variableFiles), getDest(mixinsFiles), getDest(sourceFiles)])
        .pipe(debug({
            showFiles: true
        }))
        .pipe(less({
            plugins: [require('less-plugin-glob')]
        }))
        .pipe(autoprefixer())
        .pipe(concat(outputFile))
        .pipe(gulp.dest(dest));
}

function styles() {
    Promise.all([
        toPromise(variables()),
        toPromise(mixins()),
        toPromise(sources())
    ]).then(css);
}

function toPromise(stream) {
    return new Promise((resolve, reject) => {
        stream.on('end', () => {
            console.log('resolved');
            resolve();
        });
        stream.on('error', error => {
            console.log('errored');
            reject(error);
        });
    });
}

function build() {
    styles();
    html();
}

function watch() {
    gulp.watch(['src/**/*.less'], styles);
    gulp.watch(['src/**/*.html'], html);
}