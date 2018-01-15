var gulp = require('gulp'),
	compass = require('gulp-compass');

gulp.task('scss', function(){
	return gulp.src('src/scss/**/*.scss')
			.pipe(compass({
				'css': 'build/assets/css',
				'sass': 'src/scss'
			}))
			.pipe(gulp.dest('build/assets/css'));
})