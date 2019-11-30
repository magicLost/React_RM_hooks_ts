const SsrHelper = require("./SsrHelper/SsrHelper.js").default;
const path = require("path");

const ssrHelper = new SsrHelper();
const pathToPhpStaticDir = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "Symfony",
  "Symfony_ssr",
  "public",
  "static"
);

const pathToCraStaticDir = path.join(__dirname, "..", "build", "static");

const pathToCraRenderedPagesDir = path.join(__dirname, "renderedPages");

const pathToPhpTemplatesDir = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "Symfony",
  "Symfony_ssr",
  "templates",
  "home"
);

const pathToCraAssetManifestFile = path.join(
  __dirname,
  "..",
  "build",
  "asset-manifest.json"
);
const pathToPhpAssetManifestFile = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "Symfony",
  "Symfony_ssr",
  "public",
  "asset-manifest.json"
);

//test
/* ssrHelper.test("hello", err => {
  if (err) {
    return console.error(err);
  }
  console.log(`Say hello.`);
}); */

//ssrHelper.writeTemplates(pathToCraRenderedPagesDir, pathToPhpTemplatesDir);
ssrHelper.copyAssetManifest(
  pathToCraAssetManifestFile,
  pathToPhpAssetManifestFile
);
//ssrHelper.copyDir(pathToCraStaticDir, pathToPhpStaticDir);

//delete dirs with old staff
//ssrHelper.deleteDir(pathToPhpStaticDir);

//copy dirs with new staff
//ssrHelper.copyDir(pathToCraStaticDir, pathToPhpStaticDir);

//write templates files

//re-write manifest.json file
