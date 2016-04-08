import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

let panelActions;

moduleForComponent('cp-panels', {
  integration: true,

  setup() {
    panelActions = this.container.lookup('service:panel-actions');
  },

  teardown() {
    panelActions.get('state').reset();
  }
});

// test('it can act as an accordion', function(assert) {
//   this.render(hbs`
//     {{#cp-panels accordion=true}}
//       {{#cp-panel}}
//         {{cp-panel-toggle}}
//         {{#cp-panel-body}}Panel A{{/cp-panel-body}}
//       {{/cp-panel}}
//       {{#cp-panel}}
//         {{cp-panel-toggle}}
//         {{#cp-panel-body}}Panel B{{/cp-panel-body}}
//       {{/cp-panel}}
//     {{/cp-panels}}
//   `);
//
//   var $panel1 = this.$('.cp-Panel:nth-child(1)');
//   var $panel2 = this.$('.cp-Panel:nth-child(2)');
//
//   $panel1.find('.cp-Panel-toggle').click();
//   $panel2.find('.cp-Panel-toggle').click();
//
//   assert.ok(!$panel1.hasClass('cp-is-open'));
//   assert.ok($panel2.hasClass('cp-is-open'));
// });
//
// test('all panels in a group can be opened', function(assert) {
//   this.render(hbs`
//     {{#cp-panels name="a-group-of-panels"}}
//       {{#cp-panel}}
//         {{#cp-panel-body}}Panel A{{/cp-panel-body}}
//       {{/cp-panel}}
//       {{#cp-panel}}
//         {{#cp-panel-body}}Panel B{{/cp-panel-body}}
//       {{/cp-panel}}
//     {{/cp-panels}}
//   `);
//
//   var $panel1 = this.$('.cp-Panel:nth-child(1)');
//   var $panel2 = this.$('.cp-Panel:nth-child(2)');
//
//   assert.ok($panel1.hasClass('cp-is-closed'));
//   assert.ok($panel2.hasClass('cp-is-closed'));
//
//   Ember.run(() => {
//     panelActions.openAll("a-group-of-panels");
//   });
//
//   assert.ok($panel1.hasClass('cp-is-open'));
//   assert.ok($panel2.hasClass('cp-is-open'));
// });
