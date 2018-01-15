var gulp = require('gulp');


gulp.task('image', function(){
	return gulp.src('src/images/**/*.*')
		.pipe(gulp.dest('build/assets/images/'));
});
