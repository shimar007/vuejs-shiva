var cache = require('gulp-cache');
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');

gulp.task('clear', () =>
    cache.clearAll()
);

// Basic Gulp task syntax
gulp.task('hello', function() {
  console.log('Hello Zell!');
})

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync.init({
        host: "vuejs-shiva.local"
  })
})

//css
gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sourcemaps.write())
    .pipe(concatCss("main.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

gulp.task('js', function() {
    return gulp.src('app/js/**/*.js')
      .pipe(concatCss("main.js")) 
      .pipe(gulp.dest('app/js')) // Outputs it in the js folder
      .pipe(browserSync.reload({ // Reloading with Browser Sync
        stream: true
      }));
})

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
  })

gulp.task('default', function(callback) {
    runSequence(['clear', 'sass', 'browserSync'], 'watch',
      callback
    )
})

