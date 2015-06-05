import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: ['ted-panel-toggle'],
  classNameBindings: ['isOpen:ted-panel-toggle-open'],

  // So taps register in iOS
  attributeBindings: ['href'],
  href: "#",

  isOpen: Ember.computed.alias('panelComponent.isOpen'),

  click: function(e) {
    e.preventDefault();

    this.get('panelComponent').handleToggle();
  },
});
