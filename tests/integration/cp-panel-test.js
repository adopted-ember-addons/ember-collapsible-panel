import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('cp-panel', {
  integration: true
});

test('it can toggle', function(assert) {
  this.render(hbs`
    {{#cp-panel}}
      {{cp-panel-toggle}}
      {{#cp-panel-body}}Hi!{{/cp-panel-body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');
  $panel.find('.cp-Panel-toggle').click();
  assert.ok($panel.find('.cp-Panel-body').text().match('Hi!').length);
});

test('it can start out open', function(assert) {
  this.render(hbs`
    {{#cp-panel open=true}}
      {{cp-panel-toggle}}
      {{#cp-panel-body}}Hi!{{/cp-panel-body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');
  assert.ok($panel.find('.cp-Panel-body').text().match('Hi!').length);
});

test('it can nest panels', function(assert) {
  this.render(hbs`
    {{#cp-panel class='Parent'}}
      {{cp-panel-toggle}}
      {{#cp-panel-body}}

        {{#cp-panel class='Child'}}
          {{cp-panel-toggle}}
          {{#cp-panel-body}}
            <p>I'm a Child!</p>
          {{/cp-panel-body}}
        {{/cp-panel}}

      {{/cp-panel-body}}
    {{/cp-panel}}
  `);

  var $parent = this.$('.Parent');
  $parent.find('.cp-Panel-toggle').click();

  var $child = this.$('.Child');
  $child.find('.cp-Panel-toggle').click();

  assert.ok($child.find('.cp-Panel-body').text().match(`I'm a Child!`).length);
});
