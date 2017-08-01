var webpackConfig = require('./webpack.config.js');
var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var rimraf = require('rimraf');

function runWebpackServer(webpackConfig){
    // Start a webpack-dev-server
    new WebpackDevServer(webpack(webpackConfig)).listen(8080, "localhost", function(err) {
        //if(err) throw new gutil.PluginError("webpack-dev-server", err);
        console.log("[webpack-dev-server]", "http://localhost:8080");
    });
}

gulp.task("webpack-dev-server:watch", function(callback) {
    // modify some webpack config options
    var myConfig = webpackConfig({"env":"dev"});
    myConfig.entry.vendor.unshift("webpack-dev-server/client?http://localhost:8080");
    myConfig.entry.index.unshift("webpack-dev-server/client?http://localhost:8080");
    myConfig.devtool = "eval";
    //myConfig.debug = true;
    runWebpackServer(myConfig);
});
gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    var myConfig = webpackConfig();
    //console.log(typeof myConfig);
    rimraf(myConfig.output.path,function(err){
        console.log(err);
    })
    webpack(myConfig,function(err,stats){
        if(stats.hasErrors()){
            console.log(stats.toJson().errors);
        };
    })
});

gulp.task('watch',['webpack-dev-server:watch']);
gulp.task('build',['webpack:build']);
