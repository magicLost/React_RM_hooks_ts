import React from "react";
import fs from "fs";
import path from "path";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./../src/App";

//create home page render file
type route = {
  path: string;
  fileName: string;
};
const routes: route[] = [
  {
    path: "/",
    fileName: "index"
  },
  {
    path: "/large-print",
    fileName: "largePrint"
  },
  {
    path: "/contacts",
    fileName: "contacts"
  }
];

//console.log("OTHER PATH ", __dirname);

const renderAndSavePage = (route: route) => {
  try {
    const page = renderToString(
      <StaticRouter location={route.path} context={{}}>
        <App />
      </StaticRouter>
    );

    //console.log("PATH ", __dirname); // path.join(__dirname, "HomePageRender.js")
    //console.log(page);

    fs.writeFile(
      path.join(__dirname, "..", "renderedPages", `${route.fileName}.html`),
      page,
      "utf8",
      err => {
        if (err) throw err;
        console.log(`The ${route.fileName} file has been saved!`);
      }
    );
  } catch (err) {
    console.error("ERROR ", err);
  }
};

for (let route of routes) {
  renderAndSavePage(route);
}

//create users page render file
//const users = renderToString(<HomePage />);
