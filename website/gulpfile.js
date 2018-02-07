/*
 * DESC: Combine/Minify CSS and take existing min JavaScript - replace head tags with content
 * WHY.: Google PageSpeed Insights scores of 94/99 thats why!!
 */
var fs       = require('fs'),
    gulp     = require('gulp'),
    concat   = require('gulp-concat'),
    replace  = require('gulp-string-replace'),
	cleanCSS = require('gulp-clean-css');

//var cssSrch1 = /\<link rel=\"stylesheet\" href=\"\/SpRestLib\/css\/main\.css\"\/\>/;
var cssSrch1 = '<link rel="stylesheet" href="/SpRestLib/css/main.css"/>';
var cssSrch2 = '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/hybrid.min.css"/>';
var jvsSrch1 = /\<script type="text\/javascript" src="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/highlight.*.min.js"\>\<\/script\>/;

gulp.task('min-css', function(){
	// STEP 1: Inline both css files
	return gulp.src(['../css/hybrid.min.css', './build/SpRestLib/css/main.css'])
		.pipe(concat('style.bundle.css'))
		.pipe(cleanCSS())
		.pipe(gulp.dest('../css'))
		.pipe(gulp.src('../css/style.bundle.css'));
});

gulp.task('default', ['min-css'], ()=>{
	// STEP 2: Grab newly combined styles
	var strMinCss = fs.readFileSync('../css/style.bundle.css', 'utf8');
	var strMinJvs = fs.readFileSync('../js/highlight.min.js', 'utf8');
	//console.log('>> `style.bundle.css` lines = '+ strMinCss.split('\n').length);
	//console.log('>> `highlight.min.js` lines = '+ strMinJvs.split('\n').length);

	// STEP 3: Replace head tags with inline style/javascript
	gulp.src('build/SpRestLib/index.html')
	.pipe(replace(cssSrch1, '', {logs:{ enabled:true }}))
	.pipe(replace(cssSrch2, '\n<style>'+ strMinCss +'</style>\n', {logs:{ enabled:false }}))
	.pipe(replace(jvsSrch1, '<script>'+ strMinJvs +'</script>\n', {logs:{ enabled:false }}))
	.pipe(concat('index.perf.html'))
	.pipe(gulp.dest('../'));
});
