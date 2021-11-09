import { run } from '@ember/runloop';
import { getOwner } from '@ember/application';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

let panelActions;

module('cp-panels', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.setup = function() {
      panelActions = this.owner.lookup('service:panel-actions');
    };

    this.teardown = function() {
      panelActions.get('state').reset();
    };
  });

  test('it can act as an accordion', async function(assert) {
    await render(hbs`
      {{#cp-panels accordion=true as |panels|}}
        {{#panels.panel as |panel|}}
          {{panel.toggle}}
          {{#panel.body}}Panel A{{/panel.body}}
        {{/panels.panel}}
        {{#panels.panel as |panel|}}
          {{panel.toggle}}
          {{#panel.body}}Panel B{{/panel.body}}
        {{/panels.panel}}
      {{/cp-panels}}
    `);

    var $panel1 = this.$('.cp-Panel:nth-child(1)');
    var $panel2 = this.$('.cp-Panel:nth-child(2)');

    $panel1.find('.cp-Panel-toggle').click();
    $panel2.find('.cp-Panel-toggle').click();

    assert.ok(!$panel1.hasClass('cp-is-open'));
    assert.ok($panel2.hasClass('cp-is-open'));
  });

  test('all panels in a group can be opened', async function(assert) {
    await render(hbs`
      {{#cp-panels name="a-group-of-panels" as |panels|}}
        {{#panels.panel as |panel|}}
          {{#panel.body}}Panel A{{/panel.body}}
        {{/panels.panel}}
        {{#panels.panel as |panel|}}
          {{#panel.body}}Panel B{{/panel.body}}
        {{/panels.panel}}
      {{/cp-panels}}
    `);

    var $panel1 = this.$('.cp-Panel:nth-child(1)');
    var $panel2 = this.$('.cp-Panel:nth-child(2)');

    assert.ok($panel1.hasClass('cp-is-closed'));
    assert.ok($panel2.hasClass('cp-is-closed'));

    run(() => {
      panelActions.openAll("a-group-of-panels");
    });

    assert.ok($panel1.hasClass('cp-is-open'));
    assert.ok($panel2.hasClass('cp-is-open'));
  });
});
