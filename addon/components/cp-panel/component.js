import { scheduleOnce } from '@ember/runloop';
import { computed } from '@ember/object';
import { and, oneWay, readOnly, not } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  panelActions: service(),
  dependencyChecker: service(),
  shouldAnimate: and('dependencyChecker.hasLiquidFire', 'animate'),

  group: null, // passed in if rendered as part of a {{cp-panels}} group

  classNames: ['cp-Panel'],
  classNameBindings: ['isOpen:cp-is-open:cp-is-closed'],

  // Caller can overwrite
  name: oneWay('elementId'),

  panelState: computed('name', function() {
    const name = this.get('name');
    // debugger;
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
      let name = this.get('name');
      
      this.get('panelActions').toggle(name);
      
      this.didToggle(name);
    }
  }
});
