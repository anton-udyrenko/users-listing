var gulp = require('gulp');
var less = require('gulp-less');
var lessImport = require('gulp-less-import');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var vinylPaths = require('vinyl-paths');
var del = require('del');

/**
 * Build app.css (include all project css files)
 */
gulp.task('app.css', function () {
    return task = gulp
        .src('app/less/**/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/assets/css'));
});

/**
 * Build app.css (include all project css files)
 */
gulp.task('app.js', function () {
    return task = gulp
        .src(['app/js/app.module.js', 'app/js/components/**/*.js'])
        .pipe(concat('app.js'))
        // .pipe(ngmin())
        // .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

/**
 * Clean build directory
 */
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(vinylPaths(del));
});

/**
 * Watch for changes
 */
gulp.watch(['app/less/**/*.less'], ['app.css']);

/**
 * Default task
 */
gulp.task('default', function() {
    runSequence('clean', 'app.css', 'app.js');
});