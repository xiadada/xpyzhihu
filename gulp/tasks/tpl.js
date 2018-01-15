var gulp = require('gulp'),
	tmodjs = require('gulp-tmod');
 
gulp.task('tpl', function(){
  gulp.src(['src/tpl/**/*.tpl'])
		.pipe(tmodjs({
			templateBase: 'src/tpl',
			combo: true,
			type: 'amd',
			// helpers: 'src/js/common/helper.js',
			output: 'build/assets/template'
	}));
});
