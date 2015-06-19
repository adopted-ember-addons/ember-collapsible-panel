import Ember from 'ember';

/*
  Passed-in:
    is-open. bind to panel's open/close state
*/
export default Ember.Component.extend({

  _cpPanel: true,
  panelComponent: null,
  collapsibleComponent: null,

  classNames: 'cp-Panel',
  classNameBindings: ['isOpen:cp-is-open'],

  isOpen: Ember.computed.alias('is-open'),

  setup: Ember.on('didInsertElement', function() {
    // Register with parent panels component
    var panelsWrapper = this.nearestWithProperty('_cpPanels');
    if (panelsWrapper) {
      panelsWrapper.registerPanel(this);
    }

    // Set initial open state
    this.set('isOpen', this.get('isOpen') || false);
  }),

  teardown: Ember.on('willDestroyElement', function() {
    // Register with parent panels component
    var panelsWrapper = this.nearestWithProperty('_cpPanels');
    if (panelsWrapper) {
      panelsWrapper.unregisterPanel(this);
    }
  }),

  register(type, instance) {
    this.set(type, instance);
  },

  handleToggle: function() {
    /*
      This is a hack. Only way I could get TWBS collapse to have no
      animation (which I want on mobile) was to add some css. But,
      the plugin still uses the duration, so for ~350ms there is a
      'collapsing' class. We need to wait for this to be "done" or
      else stuff gets out of sync.
    */
    // var isCollapsing = this.get('collapsibleComponent').$().hasClass('collapsing');

    // if (!isCollapsing) {
    // }
    this.toggleProperty('isOpen');
  },

  actions: {
    closePanel: function() {
      this.set('isOpen', false);
    }
  }

});
