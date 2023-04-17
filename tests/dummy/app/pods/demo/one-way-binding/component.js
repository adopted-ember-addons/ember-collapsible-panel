/* eslint-disable ember/no-actions-hash, ember/no-classic-classes, ember/no-classic-components, ember/require-tagless-components, prettier/prettier */
import Component from '@ember/component';

export default Component.extend({

  isOpen: false,

  actions: {
    toggleIsOpen() {
      this.toggleProperty('isOpen');
    }
  }

});
