/* eslint-disable ember/no-get, prettier/prettier, qunit/no-assert-equal, qunit/no-assert-equal-boolean, qunit/require-expect */
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, settled } from '@ember/test-helpers';

module('cp-panel', function(hooks) {
  setupRenderingTest(hooks);

  test('it can toggle', async function(assert) {
    await render(hbs`
      <CpPanel as |panel|>
        {{panel.toggle}}
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    await click(this.element.querySelector('.cp-Panel .cp-Panel-toggle'));

    let panelBody = this.element.querySelector('.cp-Panel .cp-Panel-body');

    assert.ok(panelBody.textContent.includes("Hi!"));
  });

  test('it exposes isOpen', async function(assert) {
    await render(hbs`
      <CpPanel as |panel|>
        {{panel.toggle}}
        <panel.body>
          {{#if panel.isOpen}}
            <p>Hi!</p>
          {{/if}}
        </panel.body>
      </CpPanel>
    `);

    await click(this.element.querySelector('.cp-Panel .cp-Panel-toggle'));

    let panelBody = this.element.querySelector('.cp-Panel .cp-Panel-body');
    assert.ok(panelBody.textContent.includes("Hi!"));

    await click(this.element.querySelector('.cp-Panel .cp-Panel-toggle'));

    assert.notOk(panelBody.textContent.includes("Hi!"));
  });

  test('it can start out open', async function(assert) {
    await render(hbs`
      <CpPanel @open={{true}} as |panel|>
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    let panelBody = this.element.querySelector('.cp-Panel .cp-Panel-body');
    assert.ok(panelBody.textContent.includes("Hi!"));
  });

  test('it can start open and toggle closed', async function(assert) {
    await render(hbs`
      <CpPanel @open={{true}} as |panel|>
        {{panel.toggle}}
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    let panel = this.element.querySelector('.cp-Panel');

    // it starts out open
    assert.ok(panel.classList.contains('cp-is-open'));

    // click it closed
    await click(panel.querySelector('.cp-Panel-toggle'));

    assert.ok(panel.classList.contains('cp-is-closed'));

  });

  test('it will open via binding', async function(assert) {
    this.set('openBinding', false);

    await render(hbs`
      <CpPanel @open={{this.openBinding}} as |panel|>
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    let panel = this.element.querySelector('.cp-Panel');

    // make sure its closed
    assert.ok(panel.classList.contains('cp-is-closed'));

    this.set('openBinding', true);

    // ok now its open
    assert.ok(panel.classList.contains('cp-is-open'));
    assert.ok(panel.querySelector('.cp-Panel-body').textContent.includes("Hi!"));
  });

  test('it will open by a service call', async function(assert) {
    await render(hbs`
      <CpPanel @name="test" as |panel|>
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    let panel = this.element.querySelector('.cp-Panel');

    // make sure its closed
    assert.ok(panel.classList.contains('cp-is-closed'));

    let panelActions = this.owner.lookup('service:panel-actions');
    panelActions.open('test');

    await settled();

    // ok now its open
    assert.ok(panel.classList.contains('cp-is-open'));
    assert.ok(panel.querySelector('.cp-Panel-body').textContent.includes("Hi!"));
  });

  test('it will use a binding or the service, but never overwrite the binding', async function(assert) {
    // this is kind of crazypants, but if someone sets up a panel with
    // a binding + a service, and then uses the service to open
    // the panel we wont overwrite the binding.

    this.set('openBinding', false);

    await render(hbs`
      <CpPanel @open={{this.openBinding}} @name="test" as |panel|>
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    let panel = this.element.querySelector('.cp-Panel');

    // make sure its closed
    assert.ok(panel.classList.contains('cp-is-closed'));

    assert.equal(this.get('openBinding'), false, 'overwrote 1');

    let panelActions = this.owner.lookup('service:panel-actions');
    // use the service to open the panel
    panelActions.open('test');

    // allow a rerender
    await settled();

    // binding doesnt change
    assert.equal(this.get('openBinding'), false, 'overwrote 2');

    // but panel is open
    assert.ok(panel.classList.contains('cp-is-open'));
    assert.ok(panel.querySelector('.cp-Panel-body').textContent.includes("Hi!"));
  });

  test('it will use a binding or a toggle, but never overwrite the binding', async function(assert) {
    this.set('openBinding', false);

    await render(hbs`
      <CpPanel @open={{this.openBinding}} as |panel|>
        {{panel.toggle}}
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    let panel = this.element.querySelector('.cp-Panel');

    // make sure its closed
    assert.ok(panel.classList.contains('cp-is-closed'));

    assert.equal(this.get('openBinding'), false, 'overwrote 1');

    // click toggle to open the panel
    await click(panel.querySelector('.cp-Panel-toggle'));

    // binding doesnt change
    assert.equal(this.get('openBinding'), false, 'overwrote');

    // but panel is open
    assert.ok(panel.classList.contains('cp-is-open'));
    assert.ok(panel.querySelector('.cp-Panel-body').textContent.includes("Hi!"));
  });

  test('it will have two panels with the same name used a shared state', async function(assert) {
    await render(hbs`
      <CpPanel @name="test" @class="panel1" as |panel|>
        <panel.body>Hi 1!</panel.body>
      </CpPanel>

      <CpPanel @name="test" @class="panel2" as |panel|>
        <panel.body>Hi 2!</panel.body>
      </CpPanel>
    `);

    let panel1 = this.element.querySelector('.cp-Panel.panel1');
    let panel2 = this.element.querySelector('.cp-Panel.panel2');

    assert.ok(panel1.classList.contains('cp-is-closed'));
    assert.ok(panel2.classList.contains('cp-is-closed'));

    let panelActions = this.owner.lookup('service:panel-actions');
    // use the service to open the panel
    panelActions.open('test');

    // allow a rerender
    await settled();

    // and both panels are now open
    assert.ok(panel1.classList.contains('cp-is-open'));
    assert.ok(panel1.querySelector('.cp-Panel-body').textContent.includes("Hi 1!"));
    assert.ok(panel2.classList.contains('cp-is-open'));
    assert.ok(panel2.querySelector('.cp-Panel-body').textContent.includes("Hi 2!"));
  });

  test('it can nest panels', async function(assert) {
    await render(hbs`
      <CpPanel @class="Parent" as |panel|>
        {{panel.toggle}}
        <panel.body>

          <CpPanel @class="Child" as |panel|>
            {{panel.toggle}}
            <panel.body>
              <p>Im a Child!</p>
            </panel.body>
          </CpPanel>

        </panel.body>
      </CpPanel>
    `);

    let parent = this.element.querySelector('.Parent');

    // open the parent
    await click(parent.querySelector('.cp-Panel-toggle'));

    let child = this.element.querySelector('.Child');

    // make sure the child isnt open
    assert.ok(child.classList.contains('cp-is-closed'));

    // now open the child
    await click(child.querySelector('.cp-Panel-toggle'));

    // and we should see 2 panel showing (child and parent)
    assert.ok(parent.classList.contains('cp-is-open'));
    assert.ok(child.classList.contains('cp-is-open'));

    // make sure the childs text is now showing
    assert.ok(child.querySelector('.cp-Panel-body').textContent.includes('Im a Child!'));
  });

  test('it calls custom didToggle method when toggled', async function(assert) {
    this.set('handleToggle', (panelName) => assert.ok(panelName, `didToggle invoked and passed the panel name: ${panelName}`));

    await render(hbs`
      <CpPanel @didToggle={{this.handleToggle}} as |panel|>
        {{panel.toggle}}
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    await click('.cp-Panel .cp-Panel-toggle');
  });

  test('it can be disabled', async function(assert) {
    await render(hbs`
      <CpPanel @disabled={{true}} as |p|>
        {{p.toggle}}
        <p.body>Hi!</p.body>
      </CpPanel>
    `);

    let panel = this.element.querySelector('.cp-Panel');
    await click(panel.querySelector('.cp-Panel-toggle'));

    assert.ok(panel.classList.contains('cp-is-closed'));
  });
});
