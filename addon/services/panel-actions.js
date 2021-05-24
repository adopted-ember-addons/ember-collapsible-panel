import { set } from "@ember/object";
import classic from "ember-classic-decorator";
import { readOnly } from "@ember/object/computed";
import { A } from "@ember/array";
import Service from "@ember/service";
import EmberObject, { computed, get } from "@ember/object";

@classic
class State extends EmberObject {
  name = null;
  boundOpenState = false;
  apiOpenState = false;
  apiWasUsed = false;

  @computed("boundOpenState", "apiOpenState", "apiWasUsed")
  get isOpen() {
    if (this.apiWasUsed) {
      return this.apiOpenState;
    } else {
      return this.boundOpenState;
    }
  }

  animate = true;
  group = null;
}

@classic
class Registry extends EmberObject {
  init() {
    super.init(...arguments);
    this.keys = A([]);
  }

  unknownProperty(name) {
    if (name === "setUnknownProperty") {
      // For failing ember-default testing scenario
      // https://travis-ci.org/adopted-ember-addons/ember-collapsible-panel/builds/626881977
      return;
    }
    const state = State.create();
    this.keys.addObject(name);
    this.set(name, state); // eslint-disable-line ember/no-side-effects

    return state;
  }

  // probably not too safe, should only be used in tests
  reset() {
    this.keys
      .slice() // copy, so we dont mess with binding/loops
      .forEach((key) => {
        delete this[key];
      });

    this.keys.clear();
  }
}

@classic
export default class PanelActionsService extends Service {
  init() {
    super.init(...arguments);
    set(this, "_registry", Registry.create());
  }

  @readOnly("_registry")
  state;

  _panelFor(name) {
    return get(this, `state.${name}`);
  }

  @computed("state.keys.[]")
  get _panels() {
    const keys = this.state.keys,
      state = this.state;

    return keys.reduce((result, key) => {
      return result.addObject(state[key]);
    }, A([]));
  }

  _panelsInGroup(name) {
    return this._panels.filterBy("group.name", name);
  }

  open(name) {
    const panel = this._panelFor(name),
      group = panel.get("group");

    if (group && group.get("accordion")) {
      // if this is part of an accordion close
      // everything else
      this.closeAll(group.get("name"));
    }

    panel.set("apiOpenState", true);
    panel.set("apiWasUsed", true);
  }

  close(name) {
    this._panelFor(name).set("apiOpenState", false);
    this._panelFor(name).set("apiWasUsed", true);
  }

  toggle(name) {
    let panel = this._panelFor(name);
    return panel.get("isOpen") ? this.close(name) : this.open(name);
  }

  openAll(group) {
    this._panelsInGroup(group).forEach((panel) => {
      panel.set("apiOpenState", true);
      panel.set("apiWasUsed", true);
    });
  }

  closeAll(group) {
    this._panelsInGroup(group).forEach((panel) => {
      panel.set("apiOpenState", false);
      panel.set("apiWasUsed", true);
    });
  }
}
