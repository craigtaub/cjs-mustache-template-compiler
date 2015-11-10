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
