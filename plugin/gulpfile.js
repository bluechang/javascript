

const gulp 				= 	require('gulp');
const gulpLoadPlugins 	= 	require('gulp-load-plugins');
const browserSync   	=	require('browser-sync').create();


gulp.task('server', ()=>{
	browserSync.init({
		notify: false,
		port: 3000,
		server: {
			baseDir: './'
		}
	})
});

gulp.task('html', ()=>{
	gulp.watch(paths.html.src, browserSync.reload);
});

gulp.task('css', ()=>{
	gulp.watch(paths.css.src, browserSync.reload);
});

gulp.task('js', ()=>{
	gulp.watch(paths.js.src, browserSync.reload);
});

gulp.task('img', ()=>{
	gulp.watch(paths.img.src, browserSync.reload);
});

gulp.task('build', (cb)=>{
	gulpSequence(['html', 'css', 'js', 'img'], 'server')(cb);
});


gulp.task('default', ['build']);








