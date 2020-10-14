'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const jest = require('gulp-jest').default;
const eslint = require('gulp-eslint');
const argv = require('yargs').argv; 
const sassLint = require('gulp-sass-lint');

/**
 * You can choose whether to use Dart Sass or Node Sass by setting the sass.compiler
 * property. Node Sass will be used by default, but it's strongly recommended that
 * you set it explicitly for forwards-compatibility in case the default ever changes.
 * @see https://www.npmjs.com/package/gulp-sass
 */
sass.compiler = require('node-sass');

// scss files
const SASS_SRC = './src/scss/**/*.scss';

//Task for compiling sass. Run with 'gulp sass'
gulp.task('sass', function() {
    return gulp.src(SASS_SRC)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/css'));
});

// Static server
gulp.task('serve', function() {
    gulp.watch(SASS_SRC, ['sass']);
});

// Default `gulp` task
gulp.task('default', ['serve']);
