/* eslint-disable prettier/prettier */
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { click, render, settled } from '@ember/test-helpers';

module('cp-panels', function(hooks) {
  setupRenderingTest(hooks);

  test('it can act as an accordion', async function(assert) {
    await render(hbs`
      <CpPanels @accordion={{true}} as |panels|>
        <panels.panel as |panel|>
          {{panel.toggle}}
          <panel.body>Panel A</panel.body>
        </panels.panel>
        <panels.panel as |panel|>
          {{panel.toggle}}
          <panel.body>Panel B</panel.body>
        </panels.panel>
      </CpPanels>
    `);

    let [panel1, panel2] = this.element.querySelectorAll('.cp-Panel');

    await click(panel1.querySelector('.cp-Panel-toggle'));
    assert.ok(panel1.classList.contains('cp-is-open'));

    await click(panel2.querySelector('.cp-Panel-toggle'));
    assert.ok(panel2.classList.contains('cp-is-open'));
  });

  test('all panels in a group can be opened', async function(assert) {
    await render(hbs`
      <CpPanels @name="a-group-of-panels" as |panels|>
        <panels.panel as |panel|>
          <panel.body>Panel A</panel.body>
        </panels.panel>
        <panels.panel as |panel|>
          <panel.body>Panel B</panel.body>
        </panels.panel>
      </CpPanels>
    `);

    let [panel1, panel2] = this.element.querySelectorAll('.cp-Panel');

    assert.ok(panel1.classList.contains('cp-is-closed'));
    assert.ok(panel2.classList.contains('cp-is-closed'));

    let panelActions = this.owner.lookup('service:panel-actions');
    panelActions.openAll("a-group-of-panels");

    // wait for a rerender
    await settled();

    assert.ok(panel1.classList.contains('cp-is-open'));
    assert.ok(panel2.classList.contains('cp-is-open'));
  });
});
