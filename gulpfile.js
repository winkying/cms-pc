const path = require('path');
var webpackConfig = require('./webpack.config.js');
var gulp = require('gulp');
var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var rimraf = require('rimraf');



function runWebpackServer(config) {
    // Start a webpack-dev-server
    //webpack 配置
    var compiler = webpack(config);
    new WebpackDevServer(compiler, {
        //server配置
        contentBase: path.resolve(__dirname, 'build'),
        host: 'dsadmin.test.odianyun.com',
        disableHostCheck: true,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://192.168.6.24',
                changeOrigin: true,
                secure: false,
                headers: {
                    host: 'dsadmin.test.odianyun.com'
                }
            },
            '/cms': {
                target: 'http://192.168.6.24',
                changeOrigin: true,
                secure: false,
                headers: {
                    host: 'dsadmin.test.odianyun.com'
                }
            },
            '/osc-api': {
                target: 'http://192.168.6.24',
                changeOrigin: true,
                secure: false,
                headers: {
                    host: 'dsadmin.test.odianyun.com'
                }
            },
            '/plugins/platform-include':{
                target: 'http://192.168.6.24',
                changeOrigin: true,
                secure: false,
                headers: {
                    host: 'dsadmin.test.odianyun.com'
                }
            },
            '/ouser-web': {
                target: 'http://192.168.6.24',
                changeOrigin: true,
                secure: false,
                headers: {
                    host: 'dsadmin.test.odianyun.com'
                }
            }
        }
    }).listen(80, "localhost", function (err) {
        //if(err) throw new gutil.PluginError("webpack-dev-server", err);
        console.log("[webpack-dev-server]", "http://localhost:80");
    });
}

gulp.task("webpack-dev-server:watch", function (callback) {
    // modify some webpack config options
    var myConfig = webpackConfig({
        "env": "dev"
    });
    myConfig.entry.vendor.unshift("webpack-dev-server/client?http://localhost:80");
    myConfig.entry.index.unshift("webpack-dev-server/client?http://localhost:80");
    myConfig.devtool = "eval";
    //myConfig.debug = true;
    runWebpackServer(myConfig);
});
gulp.task("webpack:build", function (callback) {
    // modify some webpack config options
    var myConfig = webpackConfig();
    //console.log(typeof myConfig);
    rimraf(myConfig.output.path, function (err) {
        console.log(err);
    })
    webpack(myConfig, function (err, stats) {
        if (stats.hasErrors()) {
            console.log(stats.toJson().errors);
        };
    })
});

gulp.task('watch', ['webpack-dev-server:watch']);
gulp.task('build', ['webpack:build']);