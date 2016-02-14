import gulp from 'gulp';
import sourceMaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import path from 'path';

const paths = {
  es6: ['./src/**/*.js'],
  es5: './build',
  // Must be absolute or relative to source map
  sourceRoot: path.join(__dirname, 'src')
};

gulp.task('babel', () => {
  return gulp.src(paths.es6)
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: ['stage-3', 'es2015'],
      plugins: [
        ['babel-plugin-transform-builtin-extend', {
          globals: ['Error']
        }]
      ]
    }))
    .pipe(sourceMaps.write('.', {
      includeContent: false,
      sourceRoot: paths.sourceRoot
    }))
    .pipe(gulp.dest(paths.es5));
});

gulp.task('copy-json', () => {
  return gulp.src(['./src/**/*.json', './src/**/.gitignore'])
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', ['babel'], () => {
  gulp.watch(paths.es6, ['babel']);
});

gulp.task('default', ['watch']);
