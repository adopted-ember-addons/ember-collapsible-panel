import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('cp-panels', {
  integration: true
});

test('it can act as an accordion', function(assert) {
  this.render(hbs`
    {{#cp-panels accordion=true}}
      {{#cp-panel}}
        {{cp-panel-toggle}}
        {{#cp-panel-body}}Panel A{{/cp-panel-body}}
      {{/cp-panel}}
      {{#cp-panel}}
        {{cp-panel-toggle}}
        {{#cp-panel-body}}Panel B{{/cp-panel-body}}
      {{/cp-panel}}
    {{/cp-panels}}
  `);

  var $panel1 = this.$('.cp-Panel:nth-child(1)');
  var $panel2 = this.$('.cp-Panel:nth-child(2)');

  $panel1.find('.cp-Panel-toggle').click();
  $panel2.find('.cp-Panel-toggle').click();

  assert.ok(!$panel1.hasClass('cp-is-open'));
  assert.ok($panel2.hasClass('cp-is-open'));
});
