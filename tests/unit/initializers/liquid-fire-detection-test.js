import Ember from 'ember';
import { initialize } from '../../../initializers/liquid-fire-detection';
import { module, test } from 'qunit';

var container, application;

module('Unit | Initializer | liquid fire detection', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
