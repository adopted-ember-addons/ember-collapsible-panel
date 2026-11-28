import { macroCondition, dependencySatisfies, importSync } from '@embroider/macros';
import Component, { setComponentTemplate } from '@ember/component';
import '@ember/object';
import '@ember/debug';
import { precompileTemplate } from '@ember/template-compilation';

/* eslint-disable ember/no-classic-components, ember/no-computed-properties-in-native-classes, ember/require-tagless-components, ember/template-no-let-reference, no-unused-vars */
let LiquidIf, hasRealLiquidIf;
if (macroCondition(dependencySatisfies('liquid-fire', '*'))) {
  LiquidIf = importSync('liquid-fire/components/liquid-if').default;
  hasRealLiquidIf = true;
} else {
  hasRealLiquidIf = false;
}
class CpPanelBody extends Component {
  classNames = ['cp-Panel-body'];
  classNameBindings = ['isOpen:cp-is-open'];
  get canAnimate() {
    return hasRealLiquidIf && this.shouldAnimate;
  }
  static {
    setComponentTemplate(precompileTemplate("{{#if this.canAnimate}}\n  <LiquidIf @predicate={{@isOpen}} @use=\"crossFade\">\n    <div class=\"cp-Panel-body-inner\">\n      {{yield}}\n    </div>\n  </LiquidIf>\n{{else}}\n  {{#if @isOpen}}\n    <div class=\"cp-Panel-body-inner\">\n      {{yield}}\n    </div>\n  {{/if}}\n{{/if}}", {
      strictMode: true,
      scope: () => ({
        LiquidIf
      })
    }), this);
  }
}

export { CpPanelBody as default };
//# sourceMappingURL=cp-panel-body.js.map
