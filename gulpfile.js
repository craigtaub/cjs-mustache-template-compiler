var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var del = require('del');
var shell = require('gulp-shell');
var eslint = require('gulp-eslint');

var paths = {
  // client: ['client/*'], // not used as watchify watches all files
  server: ['views/*', 'server/*']
};
var serverEntryPoint = './server/app.js';
var clientEntryPoint = './client/app.js';

// delete all compiled files
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`..not using a stream
  return del(['public/build', 'client/templates.js']);
});

// build client-side scripts
gulp.task('scripts', ['clean', 'templates'], function() {
  var bundler = watchify(browserify(clientEntryPoint, { debug: true }).transform(babelify));

  function rebundleJs() {
    return bundler.bundle()
          .on('error', function(error) {
              gutil.log(gutil.colors.red('Browserify'), error.toString());
              this.emit('end');
           })
          .pipe(source('bundle.min.js'))
          .pipe(buffer())
          .pipe(sourcemaps.init({loadMaps: true}))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest('public/build'))
          .on('end', function() {
                gutil.log('Browserify' + ':', gutil.colors.cyan('complete'));
          });
  }
  bundler.on('update', rebundleJs);

  rebundleJs();
});

// compile templates
gulp.task('templates', function (cb) {
  gutil.log('Compiling templatates');
  return gulp.src('.')
    .pipe(shell([
      'node lib/parse.js >> client/templates.js'
    ]));
});

// Watch deals with server changes
gulp.task('server', function() {
  nodemon({
      script: serverEntryPoint,
      ext: 'js json',
      watch: paths.server,
      ignore: []
  }).on('restart', function(files) {
      gutil.log('Account restarted due to files: ', files);
  });
});

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

// <!------ OLD ---->

// // ISSUE: gulp-babel or babelify both dont worth in this format.
// gulp.task('scripts', ['clean'], function() {
//   // Minify and copy all JavaScript (except vendor scripts)
//   // with sourcemaps all the way down
//   return gulp.src(paths.client)
//     .pipe(sourcemaps.init())
//     .pipe(uglify())
//     .pipe(concat('bundle.min.js'))
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('public/build'));
// });

// NOT NEEDED...scripts bundler has watchify with it.
// Run for client-side bundle
// gulp.task('watch', function() {
//   gulp.watch(paths.client, ['scripts']);
// });
