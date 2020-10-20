const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const del = require('del');
const minify = require('gulp-minify');
const sourcemaps = require('gulp-sourcemaps');

var srcPath='ikea/src/';
var destPath='ikea/public/';

var paths={
    scss:{
        src: srcPath+'scss/**/*.scss',
        dest: destPath+'css/'
    }
};

gulp.task('minify', function() {
    del([
      destPath+'js/maps/*',
      destPath+'js/maps',
      destPath+'js/site.js',
      destPath+'js/site.min.js'
  ]);
  return gulp.src([
      srcPath+'js/utils/*.js',
      srcPath+'js/canvasengine/*.js',
      srcPath+'js/data/*.js',
      srcPath+'js/addons/*.js',
      srcPath+'js/background.js',
      srcPath+'js/app.js'
    ])
    .pipe(concat('site.js'))
    .pipe(minify({ noSource:true, ext: { min: '.min.js' }}))
    .pipe(gulp.dest(destPath+'js/'))
});

gulp.task('minifydev', function() {
  del([
    destPath+'js/maps/*',
    destPath+'js/maps',
    destPath+'js/site.js',
    destPath+'js/site.min.js'
  ]);
  return gulp.src([
      srcPath+'js/utils/*.js',
      srcPath+'js/canvasengine/*.js',
      srcPath+'js/data/*.js',
      srcPath+'js/addons/*.js',
      srcPath+'js/background.js',
      srcPath+'js/app.js'
    ])
    .pipe(sourcemaps.init())
    .pipe(concat('site.min.js'))
    // .pipe(minify({ext: { min: '.min.js' }}))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(destPath+'js/'))
});

gulp.task('styles', () => {
    del([
        paths.scss.dest+'main.css',
    ]);
    return gulp.src(paths.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.scss.dest));
});
gulp.task('build', gulp.series(['styles','minify']));

gulp.task('watchcss', () => {
    gulp.watch(paths.scss.src, (done) => {
        gulp.series(['styles'])(done);
    });
});
gulp.task('watchjs', () => {
    gulp.watch('src/js', (done) => {
        gulp.series(['minifydev'])(done);
    });
});
gulp.task('watch', () => {
    gulp.watch([srcPath+'js',paths.scss.src], (done) => {
        gulp.series(['build'])(done);
    });
});
gulp.task('watchdev', () => {
    gulp.watch([srcPath+'js',paths.scss.src], (done) => {
        gulp.series(['styles','minifydev'])(done);
    });
});


gulp.task('default', gulp.series(['build']));
