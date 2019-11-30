const fs = require("fs");
const path = require("path");

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

class CRAConfigOverride {
  config: any;

  tests = {
    scssModule: `/\\.module\\.(scss|sass)$/`,
    photo: `/\\.bmp$/,/\\.gif$/,/\\.jpe?g$/,/\\.png$/`,
    ts: `/\\.(js|mjs|jsx|ts|tsx)$/`,
    js: `/\\.(js|mjs)$/`,
    css: `/\\.css$/`,
    scss: `/\\.(scss|sass)$/`,
    cssModule: `/\\.module\\.css$/`
  };

  constructor(cfg: any) {
    this.config = cfg;
  }

  writeConfigToFile = (fileName: string = "webpack.cra.config.js") => {
    let resultConfig = "";

    for (let opt in this.config) {
      if (typeof this.config[opt] !== "string")
        resultConfig += `${opt}: ${JSON.stringify(this.config[opt])} \n\n`;
      else resultConfig += `${opt}: ${this.config[opt]} \n\n`;
    }

    fs.writeFile(
      path.join("./", "config", fileName),
      resultConfig,
      "utf8",
      (err: Error) => {
        if (err) throw err;
        console.log("The Config file has been saved!");
      }
    );

    return this;
  };

  echoConfigByTestPattern = (pattern: string) => {
    for (let prop of this.config.module.rules[2].oneOf) {
      if (!prop.test) {
        //console.log(prop.loader);
        //console.log(prop.exclude);
        //console.log(prop.options);
        break;
      }

      if (prop.test.toString() === pattern) {
        //prop.test ? console.log(prop.test.toString()) : console.log("undefined");

        if (prop.use) {
          for (let loader of prop.use) {
            console.log("LOADER NAME", loader.loader);
            console.log("LOADER OPTIONS", loader.options);
            /* if (loader.loader.match(/cjs.js/) !== null) {
              loader.options.getLocalIdent = undefined;
              loader.options.localIdentName = "[name]_[local]_[hash:base64:5]";
              
            } */
          }
        } else {
          console.log("LOADER NAME", prop.loader);
          console.log("LOADER OPTIONS", prop.options);
        }
      }
    }
    return this;
  };

  echoToConsoleTestPatterns = () => {
    console.log(this.config.module.rules[1].test);

    for (let prop of this.config.module.rules[2].oneOf) {
      if (!prop.test) {
        //console.log(prop.loader);
        //console.log(prop.exclude);
        //console.log(prop.options);
        break;
      }

      console.log(prop.test.toString());
    }

    return this;
  };

  echoPlugins = () => {
    console.log("PLUGINS ", this.config.plugins);
    return this;
  };

  echoOptimization = () => {
    console.log("OPTIMIZATION", this.config.optimization.splitChunks);
    return this;
  };

  cancelBuildByError = () => {
    throw new Error("Stop building");
  };

  changeLocalIdentNamesForScssClasses = () => {
    for (let prop of this.config.module.rules[2].oneOf) {
      if (!prop.test) {
        //console.log(prop.loader);
        //console.log(prop.exclude);
        //console.log(prop.options);
        break;
      }

      if (prop.test.toString() === this.tests.scssModule) {
        //prop.test ? console.log(prop.test.toString()) : console.log("undefined");

        for (let loader of prop.use) {
          if (loader.loader.match(/cjs.js/) !== null) {
            loader.options.getLocalIdent = undefined;
            loader.options.localIdentName = "[name]_[local]_[hash:base64:5]";
            //console.log(loader.options.getLocalIdent);
          }
        }
      }
    }

    return this;
  };

  setSplitChunksToDefault = () => {
    this.config.optimization.splitChunks = {
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
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    };

    return this;
  };

  setDevToolToUndefined = () => {
    this.config.devtool = undefined;

    return this;
  };
}

export default CRAConfigOverride;
