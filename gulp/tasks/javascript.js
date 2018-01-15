var gulp = require('gulp');

gulp.task('javascript', function(){
	return gulp.src('src/js/**/*.*')
			.pipe(gulp.dest('build/assets/js/'))
})