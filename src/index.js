const axios = require("axios");
const path = require('path')
const { readFileSync, writeFileSync, mkdirSync, accessSync, constants } = require("fs");
const { default: swaggerToTS } = require("openapi-typescript");
const outputDir = path.resolve('../swagger_interface')
const outputSwJson = path.resolve(`../swagger_interface/swagger.json`)
const outputInterface = path.resolve(`../swagger_interface/interface.ts`)
class InterfacePortalPlugin {
  constructor (params = { apiPath: '' }) {
    this.apiPath = params['apiPath'] || ''
  }
  apply(compiler) {
    // todo: how to do cache
    compiler.hooks.watchRun.tapPromise("InterfacePortalPlugin", (compilation) => {
      return new Promise((resovle, reject) => {
        try {
          axios
            .get(this.apiPath)
            .then(({ data: res }) => {
              try {
                accessSync(outputDir, constants.R_OK | constants.W_OK)
              } catch (error) {
                mkdirSync(outputDir, { recursive: true })
              }
              writeFileSync(outputSwJson, JSON.stringify(res));
              const input = JSON.parse(readFileSync(outputSwJson, "utf8"));
              const output = swaggerToTS(input);
              writeFileSync(outputInterface, output);
              resovle(true);
            });
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}

module.exports = InterfacePortalPlugin;
