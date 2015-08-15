import Ember from 'ember';

export default Ember.Component.extend({

  classNameBindings: [
    ':cp-Panel',
    'isOpen:cp-is-open:cp-is-closed',
  ],
  panelsWrapper: null,
  animate: null,

  _cpPanel: true,

  _setup: Ember.on('init', function() {
    const binding = Ember.Binding.from('open').to('panelState.isOpen').oneWay();
    binding.connect(this);
  }),

  // allow caller to overwrite this property
  name: Ember.computed.oneWay('elementId'),

  panelStore: Ember.inject.service(),

  panelState: Ember.computed('nane', function() {
    const name = this.get('name');
    return this.get(`panelStore.state.${name}`);
  }),

  //isOpen: Ember.computed.readOnly('panelState.isOpen'),

  isOpen: Ember.computed('open', 'panelState.isOpen', function() {
    return this.get('open') || this.get('panelState.isOpen');
  }),

  isClosed: Ember.computed.not('isOpen'),

  register(type, instance) {
    this.set(type, instance);
  },

  handleToggle: function() {
    this.get('panelStore').toggle(this.get('name'));
  }
});
