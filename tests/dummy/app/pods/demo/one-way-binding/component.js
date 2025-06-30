/* eslint-disable ember/no-actions-hash, ember/no-classic-classes, ember/no-classic-components, ember/require-tagless-components, prettier/prettier */
import Component from '@ember/component';
import { action } from '@ember/object';

export default Component.extend({

  isOpen: false,

  toggleIsOpen: action(function () {
    this.toggleProperty('isOpen');
  })

});
