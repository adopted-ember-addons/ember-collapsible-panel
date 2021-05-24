import classic from "ember-classic-decorator";
import {
  classNames,
  classNameBindings,
  layout as templateLayout,
} from "@ember-decorators/component";
import { action, computed, set } from "@ember/object";
import { inject as service } from "@ember/service";
import { not, readOnly, oneWay, and } from "@ember/object/computed";
import { scheduleOnce } from "@ember/runloop";
import Component from "@ember/component";
import layout from "./template";

@classic
@templateLayout(layout)
@classNames("cp-Panel")
@classNameBindings("isOpen:cp-is-open:cp-is-closed", "disabled:cp-is-disabled")
export default class CpPanel extends Component {
  @service
  panelActions;

  @service
  dependencyChecker;

  @and("dependencyChecker.hasLiquidFire", "animate")
  shouldAnimate;

  disabled = false;
  group = null; // passed in if rendered as part of a {{cp-panels}} group

  // Caller can overwrite
  @oneWay("elementId")
  name;

  @computed("name")
  get panelState() {
    const { name } = this;
    return this.get(`panelActions.state.${name}`);
  }

  @readOnly("panelState.isOpen")
  isOpen;

  @not("isOpen")
  isClosed;

  panelsWrapper = null;
  animate = true;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    // If caller passes in open=, use it
    if (this.open) {
      set(this, "panelState.boundOpenState", this.open);
    }
  }

  // Register with parent panels component
  didInsertElement() {
    super.didInsertElement(...arguments);
    scheduleOnce("afterRender", this, this._group);
  }

  // Custom action called when toggling that can be provided by caller
  didToggle() {}

  @action
  toggleIsOpen() {
    if (this.disabled) {
      return;
    }
    let { name } = this;

    this.panelActions.toggle(name);

    this.didToggle(name);
  }

  _group() {
    let { group } = this;

    if (group) {
      this.panelState.set("group", group);
    }
  }
}
