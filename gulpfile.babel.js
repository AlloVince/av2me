import gulp from "gulp";
import sourceMaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import path from "path";

const paths = {
    es6: [ './src/**/*.js' ],
    es5: './build',
    // Must be absolute or relative to source map
    sourceRoot: path.join(__dirname, 'src')
};
gulp.task('babel', () => {
    return gulp.src(paths.es6)
        .pipe(sourceMaps.init())
        .pipe(babel({
            presets: [ 'es2015', 'stage-3' ]
        }))
        .pipe(sourceMaps.write('.', {
            includeContent: false,
            sourceRoot: paths.sourceRoot
        }))
        .pipe(gulp.dest(paths.es5));
});
gulp.task('watch', [ 'babel' ], () => {
    gulp.watch(paths.es6, [ 'babel' ]);
});

gulp.task('default', [ 'watch' ]);