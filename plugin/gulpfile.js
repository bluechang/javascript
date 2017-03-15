

const gulp 				= 	require('gulp');
const runSequence		=	require('run-sequence');
const browserSync   	=	require('browser-sync').create();
const $ 			 	= 	require('gulp-load-plugins');


gulp.task('server', ()=>{
	browserSync.init({
		notify: false,
		port: 7000,
		server: {
			baseDir: './'
		}
	})
});

gulp.task('html', ()=>{
	gulp.watch( '*.html', browserSync.reload );
});

gulp.task('styles', ()=>{
	gulp.watch( 'static/css/**/*', browserSync.reload );
});

gulp.task('scripts', ()=>{
	gulp.watch( 'static/js/**/*', browserSync.reload );
});

gulp.task('images', ()=>{
	gulp.watch( 'static/images/**/*', browserSync.reload );
});

gulp.task('build', ( cb )=>{
	runSequence( ['html', 'styles', 'scripts', 'images'], 'server', cb);
});


gulp.task('default', ['build']);








