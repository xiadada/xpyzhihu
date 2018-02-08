var gulp = require('gulp');

gulp.task('copy',function(){
	return gulp.src(['xpyAssembly/**/*.*'])
		.pipe(gulp.dest('build/xpyAssembly'));
})

