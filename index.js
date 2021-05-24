"use strict";

const fs = require("fs");
const path = require("path");

module.exports = {
  name: require("./package").name,

  config(env, baseConfig) {
    let configPath = path.join(this.root, "config", "environment.js");

    if (fs.existsSync(configPath)) {
      let configGenerator = require(configPath);

      return configGenerator(env, baseConfig, this);
    }
  },
};
