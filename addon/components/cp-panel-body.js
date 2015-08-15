import Ember from 'ember';
// import ENV from 'config/environment';

const { inject, computed, on } = Ember;

export default Ember.Component.extend({

  classNames: ['cp-Panel-body'],
  classNameBindings: ['isOpen:cp-is-open'],
  transitionName: computed.alias('panelComponent.transitionName'),

  _cpPanelBody: true,

  dependencyChecker: inject.service(),
  shouldAnimate: computed.and('dependencyChecker.hasLiquidFire', 'panelComponent.shouldAnimate'),

  isOpen: computed.readOnly('panelComponent.isOpen'),

  // Register with component
  setup: on('didInsertElement', function() {
    var panel = this.nearestWithProperty('_cpPanel');

    this.set('panelComponent', panel);
    panel.register('bodyComponent', this);
  })
});
