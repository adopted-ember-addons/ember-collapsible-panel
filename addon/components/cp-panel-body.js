import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['cp-Panel-body'],
  classNameBindings: ['isOpen:cp-is-open'],

  panelComponent: null,

  _cpPanelBody: true,

  dependencyChecker: Ember.inject.service(),
  shouldAnimate: Ember.computed.and('dependencyChecker.hasLiquidFire', 'panelComponent.shouldAnimate'),

  isOpen: Ember.computed.readOnly('panelComponent.isOpen'),

  registerWithPanel: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', () => {
      const panel = this.nearestWithProperty('_cpPanel');
      this.set('panelComponent', panel);
    });
  })
});
