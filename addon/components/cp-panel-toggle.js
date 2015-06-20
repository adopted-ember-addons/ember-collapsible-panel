import Ember from 'ember';

export default Ember.Component.extend({

  _cpPanelToggle: true,

  tagName: 'a',
  classNames: ['cp-Panel-toggle'],
  classNameBindings: ['isOpen:cp-is-open'],

  // So taps register in iOS
  attributeBindings: ['href'],
  href: '#',

  isOpen: Ember.computed.readOnly('panelComponent.isOpen'),

  click: function(e) {
    e.preventDefault();

    this.get('panelComponent').handleToggle();
  },

  registerWithPanel: Ember.on('didInsertElement', function() {
    var panel = this.nearestWithProperty('_cpPanel');

    this.set('panelComponent', panel);
    panel.register('toggleComponent', this);
  })
});
