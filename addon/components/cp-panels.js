import Ember from 'ember';

export default Ember.Component.extend({

  _cpPanels: true,

  classNames: 'cp-Panels',

  panels: Ember.A(),

  registerPanel(instance) {
    this.get('panels').pushObject(instance);
  },

  unregisterPanel(instance) {
    this.get('panels').removeObject(instance);
  },

  updateStuff: Ember.observer('panels.@each.isOpen', function() {
    debugger;
    if (this.get('accordion')) {
      if (this.get('alreadyOpen')) {
        this.get('alreadyOpen')
          .forEach(function(panel) {panel.set('isOpen', false);});
      }

      var alreadyOpen = this.get('panels').filter( p => p.get('isOpen') );

      this.set('alreadyOpen', alreadyOpen);
    }
  })

});
