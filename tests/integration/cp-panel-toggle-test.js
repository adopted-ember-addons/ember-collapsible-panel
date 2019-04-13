import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cp-panel-toggle', 'Integration | Component | cp panel toggle', {
  integration: true
});

test('it sets the proper aria-expanded state', function(assert) {
  this.set('isPanelOpen', true);
  this.render(hbs`
    {{#cp-panel-toggle isOpen=isPanelOpen}}
      Panel Test
    {{/cp-panel-toggle}}
  `);

  const panel = this.$('.cp-Panel-toggle');

  assert.equal(panel.attr('aria-expanded'), 'true', 'panel is opened and aria-expanded is true');

  this.set('isPanelOpen', false);
  assert.equal(panel.attr('aria-expanded'), 'false', 'panel is closed and aria-expanded is false');
});
