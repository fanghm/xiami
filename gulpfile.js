/**
 * Created by tsq on 14-7-1.
 */
var gulp = require('gulp'),
    livereload = require('gulp-livereload');
gulp.task('watch', function (){
    var server = livereload();
    gulp.watch(['./assets/*.html'], function (event){
        server.changed(event.path);
    });
});
gulp.task('default', ['watch']);