import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['cp-Panel-body'],
  classNameBindings: ['isOpen:cp-is-open'],

  _cpPanelBody: true,

  // liquidFireDetection: Ember.inject.service(),
  hasLiquidFire: Ember.computed('', function() {
    // return !!this.container.lookup('component:liquid-if');
    return !!this.container.lookup('component:liquid-if');
  }),

  isOpen: Ember.computed.readOnly('panelComponent.isOpen'),

  // Register with component
  setup: Ember.on('didInsertElement', function() {
    var panel = this.nearestWithProperty('_cpPanel');

    this.set('panelComponent', panel);
    panel.register('bodyComponent', this);
  })
});
