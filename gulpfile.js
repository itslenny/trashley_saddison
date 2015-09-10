var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

var SRC_DIR = './assets';
var DEST_DIR = './static';

gulp.task('browserify', function(){
  return browserify(SRC_DIR + '/js/main.js',{debug:true})
    .transform('reactify')
    .bundle()
    .on('error',function(err){
      console.log('error',err.stack);
      console.log('-- THERE IS AN ERROR SEE ABOVE --');
      this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(gulp.dest(DEST_DIR + '/js'));
});

gulp.task('copy', function(){
  return gulp.src([SRC_DIR + '/**/*.*','!' + SRC_DIR + '/js/**/*.*'])
  .pipe(gulp.dest(DEST_DIR));
});

gulp.task('build',['browserify', 'copy']);

gulp.task('watch',function(){
  return gulp.watch(SRC_DIR + '/**/*.*', ['build']);
});

gulp.task('default',['build','watch']);





