/* eslint-disable ember/no-classic-classes, ember/no-classic-components, ember/require-tagless-components, prettier/prettier */
import { macroCondition, dependencySatisfies, importSync } from '@embroider/macros';
import { ensureSafeComponent } from '@embroider/util';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { assert } from '@ember/debug';
import layout from './template';

let LiquidIf, hasRealLiquidIf;
if (macroCondition(dependencySatisfies('liquid-fire', '*'))) {
  LiquidIf = importSync('liquid-fire/components/liquid-if').default;
  hasRealLiquidIf = true;
} else {
  hasRealLiquidIf = false;
}

export default Component.extend({
  layout,

  classNames: ['cp-Panel-body'],
  classNameBindings: ['isOpen:cp-is-open'],

  // ideally we'd use a getter here, but that requires Ember 3.16+
  'liquidif': computed(function() {
    assert('ember-collapsible-panel\'s cp-panel-body component requires liquid-fire to be present if `shouldAnimate` is used', hasRealLiquidIf);
    return ensureSafeComponent(LiquidIf, this);
  }),
});