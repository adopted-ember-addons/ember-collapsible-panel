import Component, { setComponentTemplate } from '@ember/component';
import { computed } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { n } from 'decorator-transforms/runtime-esm';

/* eslint-disable ember/no-classic-components, ember/no-computed-properties-in-native-classes, ember/require-tagless-components, no-unused-vars */
class CpPanelToggle extends Component {
  tagName = 'a';
  classNames = ['cp-Panel-toggle'];
  classNameBindings = ['isOpen:cp-is-open'];
  // So taps register in iOS
  attributeBindings = ['href', 'ariaExpanded:aria-expanded'];
  href = '#';
  get ariaExpanded() {
    return this.isOpen ? 'true' : 'false';
  }
  static {
    n(this.prototype, "ariaExpanded", [computed('isOpen')]);
  }
  click(e) {
    e.preventDefault();
    this['on-click']();
  }
  static {
    setComponentTemplate(precompileTemplate("{{yield}}", {
      strictMode: true
    }), this);
  }
}

export { CpPanelToggle as default };
//# sourceMappingURL=cp-panel-toggle.js.map
