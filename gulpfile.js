var gulp = require('gulp');
var less = require('gulp-less');
var lessImport = require('gulp-less-import');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate')
var uglify = require('gulp-uglify');
var vinylPaths = require('vinyl-paths');
var del = require('del');
var connect = require('gulp-connect');

/**
 * Clean build directory
 */
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(vinylPaths(del));
});

/**
 * Build app.css (include all project css files)
 */
gulp.task('app.css', function () {
    return task = gulp
        .src(['app/less/main.less', 'app/less/**/*.less'])
        .pipe(concat('app.css'))
        .pipe(less())
        .pipe(gulp.dest('app/dist/assets/css'));
});

/**
 * Build app.css (include all project css files)
 */
gulp.task('app.js', function () {
    return task = gulp
        .src(['app/js/app.module.js', 'app/js/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(gulp.dest('app/dist/assets/js'));
});

/**
 * Webserver
 */
gulp.task('webserver', function() {
  connect.server({
    root: 'app'
  });
});

/**
 * Watch for changes
 */
gulp.task('watcher', ['app.css', 'app.js'], function () {
    gulp.watch(['app/less/**/*.less', 'app/js/**/*.js'], ['app.css', 'app.js']);
});

/**
 * Default task
 */
gulp.task('default', function() {
    runSequence('clean', 'app.css', 'app.js', 'webserver', 'watcher');
});
