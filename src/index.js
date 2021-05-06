const axios = require("axios");
const path = require('path')
const { readFileSync, writeFileSync, mkdirSync } = require("fs");
const { default: swaggerToTS } = require("openapi-typescript");
const outputDir = path.resolve(__dirname,'../swagger_interface')
const outputSwJson = path.resolve(__dirname,`../swagger_interface/swagger.json`)
const outputInterface = path.resolve(__dirname,`../swagger_interface/interface.ts`)
class InterfacePortalPlugin {
  constructor (params) {
    this.apiPath = params['apiPath'] || 'https://dmpkservice-test.wuxiapptec.com/DMPK.ServicePortal.WebApi/swagger/v1/swagger.json?_1619505812331' 
  }
  apply(compiler) {

    compiler.hooks.done.tapPromise("InterfacePortalPlugin", (compilation) => {
      return new Promise((resovle, reject) => {
        try {
          axios
            .get(this.apiPath)
            .then(({ data: res }) => {
              mkdirSync(outputDir, { recursive: true })
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
