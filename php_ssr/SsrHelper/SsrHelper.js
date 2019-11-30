"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var rimraf = require("rimraf");
var ncp_1 = require("ncp");
var promisify = require("util").promisify;
var fs = require("fs");
var path = require("path");
var SsrHelper = /** @class */ (function () {
    function SsrHelper() {
        var _this = this;
        this.deleteDir = function (path) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(rimraf)(path)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.copyDir = function (pathToCopy, pathDestination) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promisify(ncp_1.ncp)(pathToCopy, pathDestination)];
                    case 1: 
                    //ncp.limit = 16;
                    return [2 /*return*/, _a.sent()];
                }
            });
        }); };
        this.writeTemplates = function (craRenderedPagesDir, phpTemplatesDir) {
            fs.readdir(craRenderedPagesDir, function (err, files) {
                if (err)
                    return console.error(err.message);
                files.forEach(function (file) {
                    fs.readFile(path.join(craRenderedPagesDir, file), "utf-8", function (err, data) {
                        if (err)
                            throw err;
                        //console.log(data);
                        var content = "\n{% extends \"base.html.twig\" %}\n\n{% block root %}\n  " + data + "\n{% endblock root %}\n          ";
                        fs.writeFile(path.join(phpTemplatesDir, file + ".twig"), content, "utf-8", function (err) {
                            if (err)
                                throw err;
                            console.log(file + ".twig has been saved!");
                        });
                    });
                });
            });
            /* Promise.all([
              promisify(this.test)("str").then(() => {
                promisify(this.test)("strSTR").then(() => console.log("THE END"));
              }),
              promisify(this.test)("hello"),
              promisify(this.test)("bla")
            ]).then(() => {
              console.log("END");
            }); */
        };
        this.copyAssetManifest = function (pathToCraAssetManifestFile, pathToPhpAssetManifestFile) {
            var cra_manifest = require(pathToCraAssetManifestFile);
            var data = {};
            for (var prop in cra_manifest.files) {
                data[prop] = cra_manifest.files[prop];
            }
            fs.writeFile(pathToPhpAssetManifestFile, JSON.stringify(data), "utf-8", function (err) {
                if (err)
                    throw err;
                console.log(pathToPhpAssetManifestFile + " has been saved!");
            });
            //console.log(JSON.stringify(data));
        };
        this.test = function (hello, callback) {
            if (hello === "") {
                return callback("Bad hello");
            }
            setTimeout(function () {
                console.log("Hello is - " + hello);
                callback(undefined);
            }, 3000);
        };
        this.lastSteps = function (pathToPhpStaticDir, pathToCraStaticDir) { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        //await promisify(this.test)(str);
                        //delete dirs with old staff
                        return [4 /*yield*/, this.deleteDir(pathToPhpStaticDir)];
                    case 1:
                        //await promisify(this.test)(str);
                        //delete dirs with old staff
                        _a.sent();
                        //copy dirs with new staff
                        return [4 /*yield*/, this.copyDir(pathToCraStaticDir, pathToPhpStaticDir)];
                    case 2:
                        //copy dirs with new staff
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error("ERROR", err_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return SsrHelper;
}());
exports["default"] = SsrHelper;
