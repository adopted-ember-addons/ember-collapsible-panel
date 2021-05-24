import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, click, find } from "@ember/test-helpers";
import { run } from "@ember/runloop";

module("cp-panel", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.panelActions = this.owner.lookup("service:panel-actions");
  });

  test("it can toggle", async function (assert) {
    await render(hbs`
      <CpPanel as |panel|>
        {{panel.toggle}}
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    await click(".cp-Panel-toggle");
    assert.dom(".cp-Panel-body").hasText("Hi!");
  });

  test("it exposes isOpen", async function (assert) {
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

    await click(".cp-Panel-toggle");
    assert.dom(".cp-Panel-body").containsText("Hi!");

    await click(".cp-Panel-toggle");
    assert.dom(".cp-Panel-body").doesNotContainText("Hi!");
  });

  test("it can start out open", async function (assert) {
    await render(hbs`
      <CpPanel @open={{true}} as |panel|>
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    assert.dom(".cp-Panel-body").containsText("Hi!");
  });

  test("it can start open and toggle closed", async function (assert) {
    await render(hbs`
      <CpPanel @open={{true}} as |panel|>
        {{panel.toggle}}
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    // it starts out open
    assert.dom(".cp-Panel").hasClass("cp-is-open");

    // click it closed
    await click(".cp-Panel-toggle");
    assert.dom(".cp-Panel").hasClass("cp-is-closed");
  });

  test("it will open via binding", async function (assert) {
    this.set("openBinding", false);

    await render(hbs`
      <CpPanel @open={{this.openBinding}} as |panel|>
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    // make sure its closed
    // assert.equal($panel.find(".cp-Panel-body-inner").length, 0);
    assert.dom(".cp-Panel-body-inner").doesNotExist();

    this.set("openBinding", true);

    // ok now its open
    assert.dom(".cp-Panel-body-inner").exists();
    assert.dom(".cp-Panel-body").hasText("Hi!");
  });

  test("it will open by a service call", async function (assert) {
    await render(hbs`
      <CpPanel @name="test" as |panel|>
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    // make sure its closed
    assert.dom(".cp-Panel-body-inner").doesNotExist();

    run(() => {
      this.panelActions.open("test");
    });

    // ok now its open
    assert.dom(".cp-Panel-body-inner").exists();
    assert.dom(".cp-Panel-body").hasText("Hi!");
  });

  test("it will use a binding or the service, but never overwrite the binding", async function (assert) {
    // this is kind of crazypants, but if someone sets up a panel with
    // a binding + a service, and then uses the service to open
    // the panel we wont overwrite the binding.

    this.set("openBinding", false);

    await render(hbs`
      <CpPanel @open={{this.openBinding}} @name="test" as |panel|>
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    assert.dom(".cp-Panel").hasClass("cp-is-closed");
    assert.equal(this.openBinding, false, "overwrote 1");

    // use the service to open the panel
    run(() => {
      this.panelActions.open("test");
    });

    // binding doesnt change
    assert.equal(this.openBinding, false, "overwrote 2");

    // but panel is open
    assert.dom(".cp-Panel-body-inner").exists();
    assert.dom(".cp-Panel-body").hasText("Hi!");
  });

  test("it will use a binding or a toggle, but never overwrite the binding", async function (assert) {
    this.set("openBinding", false);

    await render(hbs`
      <CpPanel @open={{this.openBinding}} as |panel|>
        {{panel.toggle}}
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    assert.dom(".cp-Panel").hasClass("cp-is-closed");

    // click toggle to open the panel
    await click(".cp-Panel-toggle");

    // binding doesnt change
    assert.equal(this.openBinding, false, "overwrote");

    // but panel is open
    assert.dom(".cp-Panel-body-inner").exists();
    assert.dom(".cp-Panel-body").hasText("Hi!");
  });

  test("it will have two panels with the same name used a shared state", async function (assert) {
    await render(hbs`
      <CpPanel @name="test" @class="panel1" as |panel|>
        <panel.body>Hi 1!</panel.body>
      </CpPanel>

      <CpPanel @name="test" @class="panel2" as |panel|>
        <panel.body>Hi 2!</panel.body>
      </CpPanel>
    `);

    assert.dom(".cp-Panel.panel1").hasClass("cp-is-closed");
    assert.dom(".cp-Panel.panel2").hasClass("cp-is-closed");

    // use the service to open both panels

    run(() => {
      this.panelActions.open("test");
    });

    // and both panels are now open
    assert.dom(".cp-Panel.panel1").hasText("Hi 1!");
    assert.dom(".cp-Panel.panel2").hasText("Hi 2!");
  });

  test("it can nest panels", async function (assert) {
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

    let $parent = find(".Parent");

    // open the parent
    await click($parent.querySelector(".cp-Panel-toggle"));

    let $child = find(".Child");

    // make sure the child isnt open
    assert.dom($child).hasClass("cp-is-closed");

    // now open the child
    await click($child.querySelector(".cp-Panel-toggle"));

    // and we should see 2 panel showing (child and parent)
    assert.dom($parent).hasClass("cp-is-open");
    assert.dom($child).hasClass("cp-is-open");

    assert
      .dom($child.querySelector(".cp-Panel-body"))
      .containsText(`Im a Child!`);
  });

  test("it calls custom didToggle method when toggled", async function (assert) {
    this.set("handleToggle", (panelName) =>
      assert.ok(
        panelName,
        `didToggle invoked and passed the panel name: ${panelName}`
      )
    );

    await render(hbs`
      <CpPanel @didToggle={{this.handleToggle}} as |panel|>
        {{panel.toggle}}
        <panel.body>Hi!</panel.body>
      </CpPanel>
    `);

    await click(".cp-Panel-toggle");
  });

  test("it can be disabled", async function (assert) {
    await render(hbs`
      <CpPanel @disabled={{true}} as |p|>
        {{p.toggle}}
        <p.body>Hi!</p.body>
      </CpPanel>
    `);

    await click(".cp-Panel-toggle");
    assert.dom(".cp-Panel-body").doesNotContainText("Hi!");
  });
});
