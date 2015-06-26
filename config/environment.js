/* jshint node: true */
'use strict';

var VersionChecker = require('ember-cli-version-checker');

module.exports = function( environment, appConfig, addon ) {
  appConfig['ember-collapsible-panel'] = appConfig['ember-collapsible-panel'] || {};

    var checker = new VersionChecker(addon);
    var dep = checker.for('liquid-fire', 'npm');
    var hasLiquidFire = false;

    try {
      if (dep.gt('0.17.0')) {
        hasLiquidFire = true;
      }
    } catch(e) {

    }

  appConfig['ember-collapsible-panel']['hasLiquidFire'] = hasLiquidFire;

  return appConfig;
};
