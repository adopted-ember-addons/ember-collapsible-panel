import Ember from 'ember';

export default Ember.Component.extend({

  // Your binding to open the panel
  open: null,

  classNameBindings: [
    ':cp-Panel',
    'isOpen:cp-is-open:cp-is-closed',
  ],

  _cpPanel: true,

  // allow caller to overwrite this property
  name: Ember.computed.oneWay('elementId'),

  panelActions: Ember.inject.service(),

  panelState: Ember.computed('nane', function() {
    const name = this.get('name');
    return this.get(`panelActions.state.${name}`);
  }),

  group: Ember.computed.readOnly('panelState.group'),

  isOpen: Ember.computed.readOnly('panelState.isOpen'),
  isClosed: Ember.computed.not('isOpen'),

  panelsWrapper: null,
  animate: true,

  _setup: Ember.on('init', function() {
    const binding = Ember.Binding.from('open').to('panelState.boundOpenState').oneWay();
    binding.connect(this);
  }),

  // Register with parent panels component
  _afterInsert: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', () => {
      var group = this.nearestWithProperty('_cpPanels');
      if (group) {
        this.get('panelState').set('group', group);
      }
    });
  }),

  shouldAnimate: Ember.computed.alias('animate'),

  handleToggle: function() {
    this.get('panelActions').toggle(this.get('name'));
  }
});
