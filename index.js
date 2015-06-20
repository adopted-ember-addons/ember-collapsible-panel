/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-collapsible-panel',

  included: function included(app) {
    // app.import(app.bowerDirectory + '/bootstrap/js/transition.js');
    // app.import(app.bowerDirectory + '/bootstrap/js/collapse.js');
    // app.import(app.bowerDirectory + '/bootstrap/dist/css/bootstrap.css');
    app.import(app.bowerDirectory + '/jquery.actual/jquery.actual.js');
    // app.import('/vendor/actual.js');
  }

};
