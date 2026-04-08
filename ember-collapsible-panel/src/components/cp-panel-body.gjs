import { macroCondition, dependencySatisfies, importSync } from '@embroider/macros';
import { ensureSafeComponent } from '@embroider/util';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { assert } from '@ember/debug';

let LiquidIf, hasRealLiquidIf;
if (macroCondition(dependencySatisfies('liquid-fire', '*'))) {
  LiquidIf = importSync('liquid-fire/components/liquid-if').default;
  hasRealLiquidIf = true;
} else {
  hasRealLiquidIf = false;
}

export default class CpPanelBody extends Component {
  classNames = ['cp-Panel-body'];
  classNameBindings = ['isOpen:cp-is-open'];

  @computed
  get liquidif() {
    assert(
      "ember-collapsible-panel's cp-panel-body component requires liquid-fire to be present if `shouldAnimate` is used",
      hasRealLiquidIf,
    );
    return ensureSafeComponent(LiquidIf, this);
  }

  <template>
    {{#if @shouldAnimate}}
      {{#this.liquidif @isOpen use="crossFade"}}
        <div class="cp-Panel-body-inner">
          {{yield}}
        </div>
      {{/this.liquidif}}
    {{else}}
      {{#if @isOpen}}
        <div class="cp-Panel-body-inner">
          {{yield}}
        </div>
      {{/if}}
    {{/if}}
  </template>
}
