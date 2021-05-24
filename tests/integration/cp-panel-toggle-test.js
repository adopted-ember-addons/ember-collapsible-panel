import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | cp panel toggle", function (hooks) {
  setupRenderingTest(hooks);

  test("it sets the proper aria-expanded state", async function (assert) {
    this.set("isPanelOpen", true);
    await render(hbs`
      <CpPanelToggle @isOpen={{this.isPanelOpen}}>
        Panel Test
      </CpPanelToggle>
    `);

    assert.dom(".cp-Panel-toggle").hasAria("expanded", "true");

    this.set("isPanelOpen", false);
    assert.dom(".cp-Panel-toggle").hasAria("expanded", "false");
  });
});
