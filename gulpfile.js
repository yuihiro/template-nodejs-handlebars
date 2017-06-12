var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('public/style/**/*.css', ['styles']);
    gulp.watch('public/script/*.js', ['scripts']);
    gulp.watch('public/template/*.hbs', ['template']);
});
gulp.task('server', function() {
    nodemon({
        'script': 'server.js',
        'ignore': 'public/js/*.js'
    });
});
gulp.task('styles', function() {
    return gulp.dest('public/css/*.css').pipe(livereload());
});
gulp.task('scripts', function() {
    return gulp.src('public/js/*.js').pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(livereload());
});
gulp.task('template', function() {
    return gulp.src('public/template/*.hbs').pipe(handlebars({
        handlebars: require('handlebars')
    })).pipe(wrap('Handlebars.template(<%= contents %>)')).pipe(declare({
        namespace: 'Template',
        noRedeclare: true
    })).pipe(concat('template.js')).pipe(gulp.dest('public'));
});
gulp.task('bundle', function() {
    return gulp.src(['bower_components/handlebars/handlebars.runtime.js', 'bower_components/jquery/dist/jquery.js', 'bower_components/bootstrap/dist/bootstrap.js', 'js/dist/templates.js', 'js/main.js']).pipe(concat('bundle.js')).pipe(uglify()).pipe(gulp.dest('js/dist/'));
});
gulp.task('html', function() {
    return gulp.src('public/**/*.html').pipe(livereload());
});
gulp.task('serve', ['server', 'watch']);