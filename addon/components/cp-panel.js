import Ember from 'ember';

export default Ember.Component.extend({

  dependencyChecker: Ember.inject.service(),
  shouldAnimate: Ember.computed.and('dependencyChecker.hasLiquidFire', 'animate'),

  group: null, // passed in if rendered as part of a {{cp-panels}} group

  // Your binding to open the panel
  open: null,

  classNameBindings: [
    ':cp-Panel',
    'isOpen:cp-is-open:cp-is-closed',
  ],

  // allow caller to overwrite this property
  name: Ember.computed.oneWay('elementId'),

  panelActions: Ember.inject.service(),

  panelState: Ember.computed('name', function() {
    const name = this.get('name');
    return this.get(`panelActions.state.${name}`);
  }),

  // group: Ember.computed.readOnly('panelState.group'),

  isOpen: Ember.computed.readOnly('panelState.isOpen'),
  isClosed: Ember.computed.not('isOpen'),

  panelsWrapper: null,
  animate: true,

  _setup: Ember.on('init', function() {
    const binding = Ember.Binding.from('open').to('panelState.boundOpenState').oneWay();
    binding.connect(this);
  }),

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
