const axios = require("axios");
const path = require('path')
const { readFileSync, writeFileSync, mkdirSync, accessSync, constants } = require("fs");
const { default: swaggerToTS } = require("openapi-typescript");
const outputDir = path.resolve('./swagger_interface')
const outputInterface = path.resolve(`./swagger_interface/interface.ts`)
const cacheDir = path.resolve(`./node_modules/.InterfacePortal`)
const md5 = require("md5");

class InterfacePortalPlugin {
  constructor(params = { apiPath: '' }) {
    this.apiPath = params['apiPath'] || ''
    this.catchFile = `${cacheDir}/${md5(this.apiPath)}.txt`
  }
  apply (compiler) {
    // maybe using json file to catch hash
    compiler.hooks.watchRun.tapPromise("InterfacePortalPlugin", (compilation) => {
      return new Promise((resovle, reject) => {
        // check cachefile exists
        try {
          mkdirSync(cacheDir);
          writeFileSync(this.catchFile, "");
        } catch (error) {
          try {
            accessSync(this.catchFile, constants.R_OK | constants.W_OK)
          } catch (e) {
            writeFileSync(this.catchFile, "");
          }
        }
        const lastHash = readFileSync(this.catchFile, 'utf-8')
        axios
          .get(this.apiPath)
          .then(({ data: res }) => {
            const resStr = JSON.stringify(res['components'])
            const currentHash = resStr.length.toString()
            if (lastHash !== currentHash) {
              writeFileSync(this.catchFile, currentHash)
              try {
                accessSync(outputDir, constants.R_OK | constants.W_OK)
              } catch (error) {
                mkdirSync(outputDir, { recursive: true })
              }
              const output = swaggerToTS(res);
              writeFileSync(outputInterface, output);
              resovle(true);
            } else {
              resovle(true)
            }
          }).catch((e) => {
            reject(e)
          })
      });
    });
  }
}

module.exports = InterfacePortalPlugin;
