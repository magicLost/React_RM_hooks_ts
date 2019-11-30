"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
/* config.module.rules.push({
    test: /\.module\.scss$/,
    use: [
      "style-loader",
      {
        loader: require.resolve("css-loader"),
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: "[local]___[hash:base64:5]"
        }
      }
    ],
    include: path.resolve("src")
  }); */
//const oneOf = config.module.rules[2].oneOf;
//console.log(config.module.rules[1].test);
//console.log(oneOf[1].test.toString());
var CRAConfigOverride = /** @class */ (function () {
    function CRAConfigOverride(cfg) {
        var _this = this;
        this.tests = {
            scssModule: "/\\.module\\.(scss|sass)$/",
            photo: "/\\.bmp$/,/\\.gif$/,/\\.jpe?g$/,/\\.png$/",
            ts: "/\\.(js|mjs|jsx|ts|tsx)$/",
            js: "/\\.(js|mjs)$/",
            css: "/\\.css$/",
            scss: "/\\.(scss|sass)$/",
            cssModule: "/\\.module\\.css$/"
        };
        this.writeConfigToFile = function (fileName) {
            if (fileName === void 0) { fileName = "webpack.cra.config.js"; }
            var resultConfig = "";
            for (var opt in _this.config) {
                if (typeof _this.config[opt] !== "string")
                    resultConfig += opt + ": " + JSON.stringify(_this.config[opt]) + " \n\n";
                else
                    resultConfig += opt + ": " + _this.config[opt] + " \n\n";
            }
            fs.writeFile(path.join("./", "config", fileName), resultConfig, "utf8", function (err) {
                if (err)
                    throw err;
                console.log("The Config file has been saved!");
            });
            return _this;
        };
        this.echoConfigByTestPattern = function (pattern) {
            for (var _i = 0, _a = _this.config.module.rules[2].oneOf; _i < _a.length; _i++) {
                var prop = _a[_i];
                if (!prop.test) {
                    //console.log(prop.loader);
                    //console.log(prop.exclude);
                    //console.log(prop.options);
                    break;
                }
                if (prop.test.toString() === pattern) {
                    //prop.test ? console.log(prop.test.toString()) : console.log("undefined");
                    if (prop.use) {
                        for (var _b = 0, _c = prop.use; _b < _c.length; _b++) {
                            var loader = _c[_b];
                            console.log("LOADER NAME", loader.loader);
                            console.log("LOADER OPTIONS", loader.options);
                            /* if (loader.loader.match(/cjs.js/) !== null) {
                              loader.options.getLocalIdent = undefined;
                              loader.options.localIdentName = "[name]_[local]_[hash:base64:5]";
                              
                            } */
                        }
                    }
                    else {
                        console.log("LOADER NAME", prop.loader);
                        console.log("LOADER OPTIONS", prop.options);
                    }
                }
            }
            return _this;
        };
        this.echoToConsoleTestPatterns = function () {
            console.log(_this.config.module.rules[1].test);
            for (var _i = 0, _a = _this.config.module.rules[2].oneOf; _i < _a.length; _i++) {
                var prop = _a[_i];
                if (!prop.test) {
                    //console.log(prop.loader);
                    //console.log(prop.exclude);
                    //console.log(prop.options);
                    break;
                }
                console.log(prop.test.toString());
            }
            return _this;
        };
        this.echoPlugins = function () {
            console.log("PLUGINS ", _this.config.plugins);
            return _this;
        };
        this.echoOptimization = function () {
            console.log("OPTIMIZATION", _this.config.optimization.splitChunks);
            return _this;
        };
        this.cancelBuildByError = function () {
            throw new Error("Stop building");
        };
        this.changeLocalIdentNamesForScssClasses = function () {
            for (var _i = 0, _a = _this.config.module.rules[2].oneOf; _i < _a.length; _i++) {
                var prop = _a[_i];
                if (!prop.test) {
                    //console.log(prop.loader);
                    //console.log(prop.exclude);
                    //console.log(prop.options);
                    break;
                }
                if (prop.test.toString() === _this.tests.scssModule) {
                    //prop.test ? console.log(prop.test.toString()) : console.log("undefined");
                    for (var _b = 0, _c = prop.use; _b < _c.length; _b++) {
                        var loader = _c[_b];
                        if (loader.loader.match(/cjs.js/) !== null) {
                            loader.options.getLocalIdent = undefined;
                            loader.options.localIdentName = "[name]_[local]_[hash:base64:5]";
                            //console.log(loader.options.getLocalIdent);
                        }
                    }
                }
            }
            return _this;
        };
        this.setSplitChunksToDefault = function () {
            _this.config.optimization.splitChunks = {
                chunks: "async",
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 5,
                maxInitialRequests: 3,
                automaticNameDelimiter: "~",
                automaticNameMaxLength: 30,
                name: true,
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    "default": {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            };
            return _this;
        };
        this.setDevToolToUndefined = function () {
            _this.config.devtool = undefined;
            return _this;
        };
        this.config = cfg;
    }
    return CRAConfigOverride;
}());
exports["default"] = CRAConfigOverride;
