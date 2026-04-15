import { scheduleOnce } from '@ember/runloop';
import { get, computed, set, action } from '@ember/object';
import { and, oneWay, readOnly, not } from '@ember/object/computed';
import { macroCondition, dependencySatisfies } from '@embroider/macros';
import { inject } from '@ember/service';
import Component, { setComponentTemplate } from '@ember/component';
import { hash } from '@ember/helper';
import CpPanelToggle from './cp-panel-toggle.js';
import CpPanelBody from './cp-panel-body.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime-esm';

/* eslint-disable ember/no-classic-components, ember/no-computed-properties-in-native-classes, ember/require-tagless-components, ember/no-component-lifecycle-hooks, ember/no-runloop, ember/no-incorrect-calls-with-inline-anonymous-functions */
let hasLiquidFireDep;
if (macroCondition(dependencySatisfies('liquid-fire', '*'))) {
  hasLiquidFireDep = true;
} else {
  hasLiquidFireDep = false;
}
class CpPanel extends Component {
  static {
    g(this.prototype, "panelActions", [inject]);
  }
  #panelActions = (i(this, "panelActions"), void 0);
  static {
    g(this.prototype, "shouldAnimate", [and('hasLiquidFireDep', 'animate')]);
  }
  #shouldAnimate = (i(this, "shouldAnimate"), void 0);
  disabled = false;
  hasLiquidFireDep = hasLiquidFireDep;
  group = null;
  classNames = ['cp-Panel'];
  classNameBindings = ['isOpen:cp-is-open:cp-is-closed', 'disabled:cp-is-disabled'];
  // Caller can overwrite
  static {
    g(this.prototype, "name", [oneWay('elementId')]);
  }
  #name = (i(this, "name"), void 0);
  get panelState() {
    const name = this.name;
    return get(this, `panelActions.state.${name}`);
  }
  static {
    n(this.prototype, "panelState", [computed('name')]);
  }
  static {
    g(this.prototype, "isOpen", [readOnly('panelState.isOpen')]);
  }
  #isOpen = (i(this, "isOpen"), void 0);
  static {
    g(this.prototype, "isClosed", [not('isOpen')]);
  }
  #isClosed = (i(this, "isClosed"), void 0);
  panelsWrapper = null;
  animate = true;
  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);
    // If caller passes in open=, use it
    if (this.open !== undefined) {
      set(this, 'panelState.boundOpenState', this.open);
    }
  }
  // Register with parent panels component
  didInsertElement() {
    super.didInsertElement(...arguments);
    scheduleOnce('afterRender', () => {
      let group = this.group;
      if (group) {
        set(this.panelState, 'group', group);
      }
    });
  }
  toggleIsOpen() {
    if (this.disabled) {
      return;
    }
    let name = this.name;
    this.panelActions.toggle(name);
    this.didToggle?.(name);
  }
  static {
    n(this.prototype, "toggleIsOpen", [action]);
  }
  static {
    setComponentTemplate(precompileTemplate("{{yield (hash toggle=(component CpPanelToggle on-click=this.toggleIsOpen isOpen=this.isOpen) body=(component CpPanelBody shouldAnimate=this.shouldAnimate isOpen=this.isOpen) name=this.name isOpen=this.isOpen)}}", {
      strictMode: true,
      scope: () => ({
        hash,
        CpPanelToggle,
        CpPanelBody
      })
    }), this);
  }
}

export { CpPanel as default };
//# sourceMappingURL=cp-panel.js.map
