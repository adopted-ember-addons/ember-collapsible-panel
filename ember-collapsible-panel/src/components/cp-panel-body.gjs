/* eslint-disable ember/no-classic-components, ember/no-computed-properties-in-native-classes, ember/require-tagless-components, ember/template-no-let-reference, no-unused-vars */
import {
  macroCondition,
  dependencySatisfies,
  importSync,
} from '@embroider/macros';
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

  get canAnimate() {
    return hasRealLiquidIf && this.shouldAnimate;
  }

  <template>
    {{#if this.canAnimate}}
      <LiquidIf @predicate={{@isOpen}} @use="crossFade">
        <div class="cp-Panel-body-inner">
          {{yield}}
        </div>
      </LiquidIf>
    {{else}}
      {{#if @isOpen}}
        <div class="cp-Panel-body-inner">
          {{yield}}
        </div>
      {{/if}}
    {{/if}}
  </template>
}
