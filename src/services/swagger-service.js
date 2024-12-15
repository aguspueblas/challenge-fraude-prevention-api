const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
class SwaggerService {
  #logoPath;
  #faviconPath;
  #swaggerServiceUiOptions;
  constructor() {
    this.#logoPath = "files/banco-comafi.png";
    this.#faviconPath = "files/favicon.ico";
    this.#swaggerServiceUiOptions = {
      explorer: false,
      customCss: `.swagger-ui .topbar { padding: 20px 10px; background-color: white; border-bottom: 3px solid #789c48 } .swagger-ui .info .title { color: #789c48} .topbar-wrapper img { content:url("${
        this.#logoPath
      }") }`,
      operationsSorter: "alpha",
      customSiteTitle: "API Documentation",
      customfavIcon: this.#faviconPath,
    };
  }
  getSwaggerUIPage() {
    try {
      return swaggerUi.setup(
        this.getSwaggerJSON(),
        this.#swaggerServiceUiOptions,
      );
    } catch (error) {
      console.error(
        "Some wrong with getSwaggerUIPage() to expose swagger UI page",
        error,
      );
    }
  }
  getSwaggerServe() {
    try {
      return swaggerUi.serve;
    } catch (error) {
      console.error(
        "Some wrong with getSwaggerServe() to serve swagger UI",
        error,
      );
    }
  }
  /**
   * It reads the YAML file and converts it to a JSON object
   * @returns The swagger.json file is being returned.
   */
  getSwaggerJSON() {
    const swaggerPath = path.resolve(
      __dirname,
      "./../doc/business.openapi.yaml",
    );
    const apiDoc = yaml.load(
      fs.readFileSync(swaggerPath, { encoding: "utf-8" }),
    );
    return apiDoc;
  }
}
module.exports = SwaggerService;
