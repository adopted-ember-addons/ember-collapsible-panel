/* eslint-disable ember/no-actions-hash, ember/no-classic-classes, ember/no-classic-components, ember/no-component-lifecycle-hooks, ember/no-get, ember/no-incorrect-calls-with-inline-anonymous-functions, ember/require-tagless-components, prettier/prettier */
import { scheduleOnce } from '@ember/runloop';
import { computed } from '@ember/object';
import { and, oneWay, readOnly, not } from '@ember/object/computed';
import { macroCondition, dependencySatisfies } from '@embroider/macros';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from './template';

let hasLiquidFireDep;
if (macroCondition(dependencySatisfies('liquid-fire', '*'))) {
  hasLiquidFireDep = true;
} else {
  hasLiquidFireDep = false;
}

export default Component.extend({
  layout,

  panelActions: service(),
  shouldAnimate: and('hasLiquidFireDep', 'animate'),

  disabled: false,
  hasLiquidFireDep,

  group: null, // passed in if rendered as part of a {{cp-panels}} group

  classNames: ['cp-Panel'],
  classNameBindings: ['isOpen:cp-is-open:cp-is-closed', 'disabled:cp-is-disabled'],

  // Caller can overwrite
  name: oneWay('elementId'),

  panelState: computed('name', function() {
    const name = this.get('name');
    return this.get(`panelActions.state.${name}`);
  }),

  isOpen: readOnly('panelState.isOpen'),
  isClosed: not('isOpen'),

  panelsWrapper: null,
  animate: true,

  didReceiveAttrs() {
    this._super(...arguments);

    // If caller passes in open=, use it
    if (this.get('open') !== undefined) {
      this.set('panelState.boundOpenState', this.get('open'));
    }
  },

  // Register with parent panels component
  didInsertElement() {
    this._super(...arguments);
    scheduleOnce('afterRender', () => {
      let group = this.get('group');

      if (group) {
        this.get('panelState').set('group', group);
      }
    });
  },

  // Custom action called when toggling that can be provided by caller
  didToggle() {},

  actions: {
    toggleIsOpen() {
      if (this.get("disabled")) {
        return;
      }
      let name = this.get('name');

      this.get('panelActions').toggle(name);

      this.didToggle(name);
    }
  }
});
