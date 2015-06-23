import Ember from 'ember';

/*
  Passed-in:
    is-open. bind to panel's open/close state
*/
export default Ember.Component.extend({

  _cpPanel: true,
  toggleComponent: null,
  bodyComponent: null,

  classNames: 'cp-Panel',
  classNameBindings: ['isOpen:cp-is-open'],
  _singlePanelIsOpen: null,
  transition: true,

  // isOpen: Ember.computed.alias('is-open'),

  panelsWrapper: null,

  isOpen: Ember.computed('panelsWrapper.openPanels.[]', '_singlePanelIsOpen', function() {
    var wrapper = this.get('panelsWrapper');

    if (wrapper) {
      return this.get('panelsWrapper.openPanels').contains(this);
    } else {
      return this.get('_singlePanelIsOpen');
    }
    // return this.get('_singlePanelIsOpen');
  }),

  setup: Ember.on('didInsertElement', function() {
    // Register with parent panels component
    var panelsWrapper = this.nearestWithProperty('_cpPanels');
    if (panelsWrapper) {
      this.set('panelsWrapper', panelsWrapper);
      panelsWrapper.registerPanel(this);
    }

    // Set initial open state
    // this.set('isOpen', this.get('isOpen') || false);
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

    var panelsWrapper = this.get('panelsWrapper');
    if (panelsWrapper) {
      // im part of a <panels> collection
      panelsWrapper.togglePanel(this);


    } else {
      // im a lone panel
      this.toggleProperty('_singlePanelIsOpen');
      // this.toggleBody();
    }
    // } else {
    //   this.toggleProperty('isOpen');
    // }
  },

  // toggleBody: function() {
  //   this.toggleProperty('_singlePanelIsOpen');
  //   this.get('bodyComponent').toggle();
  // }

  // actions: {
  //   closePanel: function() {
  //     this.set('isOpen', false);
  //   }
  // }

});
