import { run } from "@ember/runloop";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find, click } from "@ember/test-helpers";

module("cp-panels", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.panelActions = this.owner.lookup("service:panel-actions");
  });

  test("it can act as an accordion", async function (assert) {
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

    let $panel1 = find(".cp-Panel:nth-child(1)");
    let $panel2 = find(".cp-Panel:nth-child(2)");

    await click($panel1.querySelector(".cp-Panel-toggle"));
    await click($panel2.querySelector(".cp-Panel-toggle"));

    assert.dom($panel1).doesNotHaveClass("cp-is-open");
    assert.dom($panel2).hasClass("cp-is-open");
  });

  test("all panels in a group can be opened", async function (assert) {
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

    let $panel1 = find(".cp-Panel:nth-child(1)");
    let $panel2 = find(".cp-Panel:nth-child(2)");

    assert.dom($panel1).hasClass("cp-is-closed");
    assert.dom($panel2).hasClass("cp-is-closed");

    run(() => {
      this.panelActions.openAll("a-group-of-panels");
    });

    assert.dom($panel1).hasClass("cp-is-open");
    assert.dom($panel2).hasClass("cp-is-open");
  });
});
