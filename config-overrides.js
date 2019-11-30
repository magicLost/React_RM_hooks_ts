/* eslint-disable */
const path = require("path");
const fs = require("fs");
const CRAConfigOverride = require("./php_ssr/CRAConfigOverride/CRAConfigOverride.js")
  .default;

module.exports = (config, env) => {
  //const oneOf = config.module.rules[2].oneOf;
  //console.log(config.module.rules[1].test);

  //console.log(oneOf[1].test.toString());

  //console.log(CRAConfigOverride);

  const craConfig = new CRAConfigOverride(config);

  craConfig
    //.writeConfigToFile()
    //.echoToConsoleTestPatterns()
    //.echoConfigByTestPattern(craConfig.tests.photo)
    .changeLocalIdentNamesForScssClasses()
    .echoOptimization()
    //.setSplitChunksToDefault()
    //.echoPlugins()
    //.setDevToolToUndefined();
    .cancelBuildByError();

  return config;
};
