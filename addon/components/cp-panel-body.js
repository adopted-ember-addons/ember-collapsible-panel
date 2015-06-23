import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['cp-Panel-body'],
  classNameBindings: ['isOpen:cp-is-open'],

  _cpPanelBody: true,

  isOpen: Ember.computed.readOnly('panelComponent.isOpen'),

  // Register with component
  setup: Ember.on('didInsertElement', function() {
    var panel = this.nearestWithProperty('_cpPanel');

    this.set('panelComponent', panel);
    panel.register('bodyComponent', this);
  })
});
