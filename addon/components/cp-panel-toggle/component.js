/* eslint-disable ember/no-classic-classes, ember/no-classic-components, ember/no-get, ember/require-tagless-components, prettier/prettier */
import Component from '@ember/component';
import { computed, get } from "@ember/object";

export default Component.extend({

  tagName: 'a',
  classNames: ['cp-Panel-toggle'],
  classNameBindings: ['isOpen:cp-is-open'],

  // So taps register in iOS
  attributeBindings: ['href', 'ariaExpanded:aria-expanded'],
  href: '#',

  ariaExpanded: computed('isOpen', function() {
    return get(this, 'isOpen') ? 'true' : 'false';
  }),

  click(e) {
    e.preventDefault();
    this.get('on-click')();
  }

});
