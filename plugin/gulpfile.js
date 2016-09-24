
const gulp 				= require('gulp');
const autoprefixer 		= require('gulp-autoprefixer');
const less 				= require('gulp-less');
const uglify 			= require('gulp-uglify');
const browserSync 		= require('browser-sync').create();


const files = {
	html: 		['./*.html'],
	css:  		['./static/css/**'],
	less:  		['./static/less/**'],
	lessMain: 	['./static/less/main.less'],
	lessTarget: ['./static/css/'],
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
	});
});

gulp.task('html', ()=>{
	gulp.watch(files.html, browserSync.reload);
});

gulp.task('css', ()=>{
	gulp.watch(files.css, browserSync.reload);
});

gulp.task('less', ()=>{
	gulp.watch(files.less, ()=>{
		gulp.src(files.lessMain.toString())
			.pipe(less())
			.pipe(autoprefixer({
				browsers: ['Chrome > 0', 'ff > 0', 'ie > 0', 'Opera > 0', 'iOS > 0', 'Android > 0']
			}))
			.pipe(gulp.dest(files.lessTarget.toString()))
			.pipe(browserSync.stream({once: true}));
	});
});

gulp.task('js', ()=>{
	gulp.watch(files.js, browserSync.reload);
});

gulp.task('img', ()=>{
	gulp.watch(files.img, browserSync.reload);
});

gulp.task('build', ['server', 'html', 'css', 'js', 'img']);

gulp.task('default', ['build']);























