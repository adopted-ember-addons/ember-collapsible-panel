'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-collapsible-panel'],
    },
  });

  app.import('node_modules/bootstrap/dist/css/bootstrap.css');

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app);
};
