var gulp = require('gulp'),
	tmodjs = require('gulp-tmod');
 
gulp.task('tpl', function(){
  return gulp.src(['src/tpl/**/*.*'])
		.pipe(tmodjs({
			templateBase: 'src/tpl',
			combo: true,
			type: 'amd',
			// helpers: 'src/js/common/helper.js',
			output: 'build/assets/template'
	}));
});
