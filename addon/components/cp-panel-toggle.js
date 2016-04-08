import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'a',
  classNames: ['cp-Panel-toggle'],
  classNameBindings: ['isOpen:cp-is-open'],

  // So taps register in iOS
  attributeBindings: ['href'],
  href: '#',

  click(e) {
    e.preventDefault();
    this.get('on-click')();
  }

});
