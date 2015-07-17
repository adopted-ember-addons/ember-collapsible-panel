import Ember from 'ember';
// import ENV from 'config/environment';

export default Ember.Component.extend({

  classNames: ['cp-Panel-body'],
  classNameBindings: ['isOpen:cp-is-open'],

  _cpPanelBody: true,

  dependencyChecker: Ember.inject.service(),
  shouldAnimate: Ember.computed.and('dependencyChecker.hasLiquidFire', 'panelComponent.shouldAnimate'),

  isOpen: Ember.computed.readOnly('panelComponent.isOpen'),

  // Register with component
  setup: Ember.on('didInsertElement', function() {
    var panel = this.nearestWithProperty('_cpPanel');

    this.set('panelComponent', panel);
    panel.register('bodyComponent', this);
  })
});
