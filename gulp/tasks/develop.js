var gulp = require('gulp'),
	runSequence = require('gulp-run-sequence'),
	clean = require('gulp-clean');

gulp.task('dev', function(){
	runSequence('html', 'scss', 'javascript', 'tpl', 'image', 'watch')
})

gulp.task('clean', function(){
	return gulp.src('build/**/*').pipe(clean());
})