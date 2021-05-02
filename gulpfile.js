'use strict';

import gulp from 'gulp';
import scss from 'gulp-sass'
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';

const server = browserSync.create();

var config = {
    paths: {
        scss: {
            src: ['./src/scss/*.scss', './src/scss/*/*.scss'],
            dest: './src/css/',
        },
    },

    scssOptions: {
        outputStyle: "expanded",
        indentType: "tab",
        indentWidth: 1,
        precision: 3,
    }
}

var { paths, scssOptions } = config;

function html () {
    browserSync.reload();
}

function sass() {
    return gulp.src(paths.scss.src)
        .pipe(scss(scssOptions)
            .on('error', scss.logError))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(browserSync.stream());
}

function sync(done) {
    browserSync.init({
        port: 3000,
        server: {
            baseDir: './',
            directory: true
        }
    });
    done();
}

function watch () {
    gulp.watch(paths.scss.src, gulp.series(sass));
    gulp.watch("./src/*.html").on('change', browserSync.reload);
};

const develop = gulp.series(sass, sync, watch);

export default develop;