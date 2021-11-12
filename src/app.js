const express = require("express");
const cors = require("cors");
const recursiveReaddir = require("recursive-readdir");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(path.resolve().concat("/docs/rotas-docs.yaml"));

class App {
  constructor () {
    this.server = express();
    this.server.use(cors());
    this.middlewares();
    this.routes();
  }

  middlewares () {
    this.server.use(express.json());
  }

  routes () {
    /* this.server.use(
      "/rotas-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    ); */

    const pathFiles = path.resolve(
      path.resolve("./").concat("/src/rest/routes")
    );

    recursiveReaddir(pathFiles, ["!*.js"], (error, files) => {
      if (error) {
        console.error(
          `Src: app || Method: routes || ErrorMessage: Error to importing routes: ${error}`
        );
        process.exit(1);
      }

      files.forEach((element) => {
        const route = require(element);
        this.server.use(route);
      });
    });
  }
}

module.exports = new App().server;
