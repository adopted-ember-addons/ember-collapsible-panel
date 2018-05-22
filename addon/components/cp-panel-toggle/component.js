import Component from '@ember/component';

export default Component.extend({

  tagName: 'a',
  classNames: ['cp-Panel-toggle'],
  classNameBindings: ['isOpen:cp-is-open'],

  // So taps register in iOS
  attributeBindings: ['href', 'isOpen:aria-expanded'],
  href: '#',

  click(e) {
    e.preventDefault();
    this.get('on-click')();
  }

});
