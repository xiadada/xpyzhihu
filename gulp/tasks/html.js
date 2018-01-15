var gulp = require('gulp');

gulp.task('html', function(){
	return gulp.src(['src/view/**/*.html'])
		.pipe(gulp.dest('build/'));
})