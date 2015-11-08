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

var paths = {
  client: ['client/*'],
  server: ['views/*', 'server/*']
};
var serverEntryPoint = './server/app.js';
var clientEntryPoint = './client/app.js';

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['public/build']);
});

gulp.task('scripts', ['clean'], function() {
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


gulp.task('default', function() {
  // place code for your default task here
  console.log('RUN DEFAULT');
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

function string_src(filename, string) {
  var src = require('stream').Readable({ objectMode: true })
  src._read = function () {
    this.push(new gutil.File({ cwd: "", base: "", path: filename, contents: new Buffer(string) }))
    this.push(null)
  }
  return src
}

// <!------ OLD ---->

// gulp.task('hogan', function() {
//   var hogan = require("hogan.js");
//   var template = "Hello {{world}}!";
//   var hello = hogan.compile(template);
//
//   console.log(JSON.stringify(hello));
//
//   // Write data to file
//   var stream = source('templates.js'); //file
//   stream.end('write this to file'); //string to write
//   stream.pipe(gulp.dest('')); //folder
//
//   // console.log(hello.render({world: "cfaig" }));
// });

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
