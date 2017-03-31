import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,

  panelActions: Ember.inject.service(),
  dependencyChecker: Ember.inject.service(),
  shouldAnimate: Ember.computed.and('dependencyChecker.hasLiquidFire', 'animate'),

  group: null, // passed in if rendered as part of a {{cp-panels}} group

  classNames: ['cp-Panel'],
  classNameBindings: ['isOpen:cp-is-open:cp-is-closed'],

  // Caller can overwrite
  name: Ember.computed.oneWay('elementId'),

  panelState: Ember.computed('name', function() {
    const name = this.get('name');
    // debugger;
    return this.get(`panelActions.state.${name}`);
  }),

  isOpen: Ember.computed.readOnly('panelState.isOpen'),
  isClosed: Ember.computed.not('isOpen'),

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
  maybeRegisterWithStateService: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', () => {
      let group = this.get('group');

      if (group) {
        this.get('panelState').set('group', group);
      }
    });
  }),

  actions: {
    toggleIsOpen() {
      this.get('panelActions').toggle(this.get('name'));
    }
  }
});
