const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');

var srcPath='src/';
var destPath='public/';

var paths={
    scss:{
        src: srcPath+'scss/**/*.scss',
        dest: destPath+'css/'
    }
};

gulp.task('styles', () => {
    return gulp.src(paths.scss.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.scss.dest));
});

gulp.task('clean', () => {
    return del([
        paths.scss.dest+'main.css',
    ]);
});

gulp.task('default', gulp.series(['clean', 'styles']));

gulp.task('watch', () => {
    gulp.watch(paths.scss.src, (done) => {
        gulp.series(['clean', 'styles'])(done);
    });
});