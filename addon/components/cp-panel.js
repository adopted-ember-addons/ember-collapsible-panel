import Ember from 'ember';

export default Ember.Component.extend({

  classNames: 'cp-Panel',
  classNameBindings: ['isOpen:cp-is-open'],
  panelsWrapper: null,
  animate: null,

  _cpPanel: true,
  _singlePanelIsOpen: null,

  isOpen: Ember.computed('panelsWrapper.openPanels.[]', '_singlePanelIsOpen', function() {
    var wrapper = this.get('panelsWrapper');

    if (wrapper) {
      return this.get('panelsWrapper.openPanels').contains(this);
    } else {
      return this.get('_singlePanelIsOpen');
    }
  }),

  shouldAnimate: Ember.computed('animate', 'panelsWrapper.animate', function() {
    if (this.get('panelsWrapper')) {
      return this.get('animate') !== null ? this.get('animate') : this.get('panelsWrapper.animate');
    } else {
      return this.get('animate') !== null ? this.get('animate') : true; // default for single panels
    }
  }),

  // Register with parent panels component
  setup: Ember.on('didInsertElement', function() {
    var panelsWrapper = this.nearestWithProperty('_cpPanels');
    if (panelsWrapper) {
      this.set('panelsWrapper', panelsWrapper);
      panelsWrapper.registerPanel(this);
    }

    // Initial state
    if (this.get('open')) {
      this.set('_singlePanelIsOpen', true);
    }
  }),

  // Unregister with parent panels component
  teardown: Ember.on('willDestroyElement', function() {
    var panelsWrapper = this.nearestWithProperty('_cpPanels');
    if (panelsWrapper) {
      panelsWrapper.unregisterPanel(this);
    }
  }),

  register(type, instance) {
    this.set(type, instance);
  },

  handleToggle: function() {
    var panelsWrapper = this.get('panelsWrapper');

    if (panelsWrapper) {
      panelsWrapper.togglePanel(this);

    } else {
      this.toggleProperty('_singlePanelIsOpen');
    }
  }
});
