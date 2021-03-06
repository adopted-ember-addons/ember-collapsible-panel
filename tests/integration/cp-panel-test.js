import { run } from '@ember/runloop';
import { getOwner } from '@ember/application';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import $ from 'jquery';

let panelActions;

moduleForComponent('cp-panel', {
  integration: true,

  setup() {
    panelActions = getOwner(this).lookup('service:panel-actions');
  },

  teardown() {
    panelActions.get('state').reset();
  }
});

test('it can toggle', function(assert) {
  this.render(hbs`
    {{#cp-panel as |panel|}}
      {{panel.toggle}}
      {{#panel.body}}Hi!{{/panel.body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');
  $panel.find('.cp-Panel-toggle').click();

  assert.ok($panel.find('.cp-Panel-body').text().match('Hi!').length);
});

test('it exposes isOpen', function(assert) {
  this.render(hbs`
    {{#cp-panel as |panel|}}
      {{panel.toggle}}
      {{#panel.body}}
        {{#if panel.isOpen}}
          <p>Hi!</p>
        {{/if}}
      {{/panel.body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');
  $panel.find('.cp-Panel-toggle').click();

  assert.ok($panel.find(':contains(Hi!)').length);

  $panel.find('.cp-Panel-toggle').click();

  assert.notOk($panel.find(':contains(Hi!)').length);
});

test('it can start out open', function(assert) {
  this.render(hbs`
    {{#cp-panel open=true as |panel|}}
      {{#panel.body}}Hi!{{/panel.body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');
  assert.ok($panel.find('.cp-Panel-body').text().match('Hi!').length);
});

test('it can start open and toggle closed', function(assert) {
  this.render(hbs`
    {{#cp-panel open=true as |panel|}}
      {{panel.toggle}}
      {{#panel.body}}Hi!{{/panel.body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');

  // it starts out open
  assert.ok($panel.hasClass('cp-is-open'));

  // click it closed
  $panel.find('.cp-Panel-toggle').click();

  assert.ok($panel.hasClass('cp-is-closed'));

});

test('it will open via binding', function(assert) {
  this.set('openBinding', false);

  this.render(hbs`
    {{#cp-panel open=openBinding as |panel|}}
      {{#panel.body}}Hi!{{/panel.body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');

  // make sure its closed
  assert.equal($panel.find('.cp-Panel-body-inner').length, 0);

  this.set('openBinding', true);

  // ok now its open
  assert.equal($panel.find('.cp-Panel-body-inner').length, 1);
  assert.ok($panel.find('.cp-Panel-body').text().match('Hi!').length);
});

test('it will open by a service call', function(assert) {
  this.render(hbs`
    {{#cp-panel name="test" as |panel|}}
      {{#panel.body}}Hi!{{/panel.body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');

  // make sure its closed
  assert.equal($panel.find('.cp-Panel-body-inner').length, 0);

  run(() => {
    panelActions.open('test');
  });

  // ok now its open
  assert.equal($panel.find('.cp-Panel-body-inner').length, 1);
  assert.ok($panel.find('.cp-Panel-body').text().match('Hi!').length);
});

test('it will use a binding or the service, but never overwrite the binding', function(assert) {
  // this is kind of crazypants, but if someone sets up a panel with
  // a binding + a service, and then uses the service to open
  // the panel we wont overwrite the binding.

  this.set('openBinding', false);

  this.render(hbs`
    {{#cp-panel open=openBinding name="test" as |panel|}}
      {{#panel.body}}Hi!{{/panel.body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');
  assert.ok($panel.hasClass('cp-is-closed'));

  assert.equal(this.get('openBinding'), false, 'overwrote 1');

  // use the service to open the panel
  run(() => {
    panelActions.open('test');
  });

  // binding doesnt change
  assert.equal(this.get('openBinding'), false, 'overwrote 2');

  // but panel is open
  assert.equal($panel.find('.cp-Panel-body-inner').length, 1);
  assert.ok($panel.find('.cp-Panel-body').text().match('Hi!').length);
});

test('it will use a binding or a toggle, but never overwrite the binding', function(assert) {
  this.set('openBinding', false);

  this.render(hbs`
    {{#cp-panel open=openBinding as |panel|}}
      {{panel.toggle}}
      {{#panel.body}}Hi!{{/panel.body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');
  assert.ok($panel.hasClass('cp-is-closed'));

  // click toggle to open the panel
  $panel.find('.cp-Panel-toggle').click();

  // binding doesnt change
  assert.equal(this.get('openBinding'), false, 'overwrote');

  // but panel is open
  assert.equal($panel.find('.cp-Panel-body-inner').length, 1);
  assert.ok($panel.find('.cp-Panel-body').text().match('Hi!').length);
});

test('it will have two panels with the same name used a shared state', function(assert) {
  this.render(hbs`
    {{#cp-panel name="test" class="panel1" as |panel|}}
      {{#panel.body}}Hi 1!{{/panel.body}}
    {{/cp-panel}}

    {{#cp-panel name="test" class="panel2" as |panel|}}
      {{#panel.body}}Hi 2!{{/panel.body}}
    {{/cp-panel}}
  `);

  let $panel1 = $('.cp-Panel.panel1');
  let $panel2 = $('.cp-Panel.panel2');
  assert.ok($panel1.hasClass('cp-is-closed'));
  assert.ok($panel2.hasClass('cp-is-closed'));

  // use the service to open both panels
  run(() => {
    panelActions.open('test');
  });

  // and both panels are now open
  assert.equal($panel1.text().match('Hi 1!').length, 1);
  assert.equal($panel2.text().match('Hi 2!').length, 1);
});

test('it can nest panels', function(assert) {
  this.render(hbs`
    {{#cp-panel class='Parent' as |panel|}}
      {{panel.toggle}}
      {{#panel.body}}

        {{#cp-panel class='Child' as |panel|}}
          {{panel.toggle}}
          {{#panel.body}}
            <p>Im a Child!</p>
          {{/panel.body}}
        {{/cp-panel}}

      {{/panel.body}}
    {{/cp-panel}}
  `);

  var $parent = this.$('.Parent');

  // open the parent
  $parent.find('.cp-Panel-toggle').click();

  var $child = this.$('.Child');

  // make sure the child isnt open
  assert.ok($child.hasClass('cp-is-closed'));

  // now open the child
  $child.find('.cp-Panel-toggle').click();

  // and we should see 2 panel showing (child and parent)
  assert.ok($parent.hasClass('cp-is-open'));
  assert.ok($child.hasClass('cp-is-open'));

  // make sure the childs text is now showing
  assert.equal($child.find('.cp-Panel-body').text().match(`Im a Child!`).length, 1);
});

test('it calls custom didToggle method when toggled', function(assert) {
  this.set('handleToggle', (panelName) => assert.ok(panelName, `didToggle invoked and passed the panel name: ${panelName}`));

  this.render(hbs`
    {{#cp-panel didToggle=handleToggle as |panel|}}
      {{panel.toggle}}
      {{#panel.body}}Hi!{{/panel.body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');
  $panel.find('.cp-Panel-toggle').click();
});

test('it can be disabled', function(assert) {
  this.render(hbs`
    {{#cp-panel disabled=true as |p|}}
      {{p.toggle}}
      {{#p.body}}Hi!{{/p.body}}
    {{/cp-panel}}
  `);

  var $panel = this.$('.cp-Panel');
  $panel.find('.cp-Panel-toggle').click();

  assert.ok($panel.find('.cp-Panel-body').text().match('Hi!') === null);
});