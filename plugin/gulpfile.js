
const gulp 			= 	require('gulp');
const autoprefixer  = 	require('gulp-autoprefixer');
const uglify 		= 	require('gulp-uglify');
const less 			= 	require('gulp-less');
const browserSync   =	require('browser-sync').create();

const files = {
	html: 		['./*.html'],
	css:  		['./static/css/**'],
	less: 		{
		src:    './static/less/**',
		main:   './static/less/style.less',
		dest:   './static/css/'
	},
	js: 		['./static/js/**'],
	img: 		['./static/images/**']
};


gulp.task('server', ()=>{
	browserSync.init({
		notify: false,
		port: 7001,
		server: {
			baseDir: './'
		}
	})
});

gulp.task('html', ()=>{
	gulp.watch(files.html, browserSync.reload);
});

gulp.task('css', ()=>{
	gulp.watch(files.css, browserSync.reload);
});

gulp.task('less', ()=>{
	gulp.watch(files.less.src, ()=>{
		gulp.src(files.less.main)
			.pipe(less())
			.pipe(autoprefixer({
				browsers: ['Chrome > 0', 'ff > 0', 'ie > 0', 'Opera > 0', 'iOS > 0', 'Android > 0']
			}))
			.pipe(gulp.dest(files.less.dest))
			.pipe(browserSync.stream({once: true}));
	});
});

gulp.task('js', ()=>{
	gulp.watch(files.js, browserSync.reload);
});

gulp.task('img', ()=>{
	gulp.watch(files.img, browserSync.reload);
});


gulp.task('build', ['server', 'html', 'less', 'js', 'img']);


gulp.task('default', ['build']);








