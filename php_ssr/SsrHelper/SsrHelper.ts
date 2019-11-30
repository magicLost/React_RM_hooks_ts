import * as rimraf from "rimraf";
import { ncp } from "ncp";
const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

class SsrHelper {
  deleteDir = async (path: string) => {
    return await promisify(rimraf)(path);
    //return await this.rimrafPromisify(path);
    /* rimraf(path, err => {
      if (err) {
        return console.error(err);
      }
      console.log(`${path} - successfully deleted.`);
    }); */
  };

  copyDir = async (pathToCopy, pathDestination) => {
    //ncp.limit = 16;
    return await promisify(ncp)(pathToCopy, pathDestination);

    /* ncp(pathToCopy, pathDestination, err => {
      if (err) {
        return console.error(err);
      }
      console.log("Copy dir done!");
    }); */
  };

  writeTemplates = (craRenderedPagesDir: string, phpTemplatesDir: string) => {
    fs.readdir(craRenderedPagesDir, (err, files) => {
      if (err) return console.error(err.message);

      files.forEach(file => {
        fs.readFile(
          path.join(craRenderedPagesDir, file),
          "utf-8",
          (err, data) => {
            if (err) throw err;
            //console.log(data);
            const content = `
{% extends "base.html.twig" %}

{% block root %}
  ${data}
{% endblock root %}
          `;
            fs.writeFile(
              path.join(phpTemplatesDir, `${file}.twig`),
              content,
              "utf-8",
              err => {
                if (err) throw err;
                console.log(`${file}.twig has been saved!`);
              }
            );
          }
        );
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

  copyAssetManifest = (
    pathToCraAssetManifestFile: string,
    pathToPhpAssetManifestFile: string
  ) => {
    const cra_manifest = require(pathToCraAssetManifestFile);

    let data: { [key: string]: string } = {};

    for (let prop in cra_manifest.files) {
      data[prop] = cra_manifest.files[prop];
    }

    fs.writeFile(
      pathToPhpAssetManifestFile,
      JSON.stringify(data),
      "utf-8",
      err => {
        if (err) throw err;
        console.log(`${pathToPhpAssetManifestFile} has been saved!`);
      }
    );
    //console.log(JSON.stringify(data));
  };

  test = (
    hello: string,
    callback: (err: string | undefined) => void | undefined
  ) => {
    if (hello === "") {
      return callback("Bad hello");
    }

    setTimeout(() => {
      console.log(`Hello is - ${hello}`);
      callback(undefined);
    }, 3000);
  };

  lastSteps = async (
    pathToPhpStaticDir: string,
    pathToCraStaticDir: string
  ) => {
    try {
      //await promisify(this.test)(str);

      //delete dirs with old staff

      await this.deleteDir(pathToPhpStaticDir);

      //copy dirs with new staff
      await this.copyDir(pathToCraStaticDir, pathToPhpStaticDir);

      //write templates files
    } catch (err) {
      console.error("ERROR", err.message);
    }
  };
}

export default SsrHelper;
