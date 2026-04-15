import { oneWay } from '@ember/object/computed';
import Component, { setComponentTemplate } from '@ember/component';
import { hash } from '@ember/helper';
import CpPanel from './cp-panel.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i } from 'decorator-transforms/runtime-esm';

/* eslint-disable ember/no-computed-properties-in-native-classes, ember/require-tagless-components, ember/no-classic-components */
class CpPanels extends Component {
  classNames = ['cp-Panels'];
  accordion = false;
  animate = true;
  _cpPanels = true;
  static {
    g(this.prototype, "name", [oneWay('elementId')]);
  }
  #name = (i(this, "name"), void 0);
  static {
    setComponentTemplate(precompileTemplate("{{yield (hash panel=(component CpPanel group=this) name=@name)}}", {
      strictMode: true,
      scope: () => ({
        hash,
        CpPanel
      })
    }), this);
  }
}

export { CpPanels as default };
//# sourceMappingURL=cp-panels.js.map
