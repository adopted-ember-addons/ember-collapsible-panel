import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { trackedObject } from '@ember/reactive/collections';

import { CpPanelToggle } from 'ember-collapsible-panel';

module('<CpPanelToggle>', function (hooks) {
  setupRenderingTest(hooks);

  test('it sets the proper aria-expanded state', async function (assert) {
    const state = trackedObject({ isPanelOpen: true });

    await render(
      <template>
        <CpPanelToggle @isOpen={{state.isPanelOpen}}>
          Panel Test
        </CpPanelToggle>
      </template>,
    );

    assert.dom('.cp-Panel-toggle').hasAttribute('aria-expanded', 'true');

    state.isPanelOpen = false;
    await settled();

    assert.dom('.cp-Panel-toggle').hasAttribute('aria-expanded', 'false');
  });
});
