import Component from '@ember/component';

export default Component.extend({

  isOpen: false,

  actions: {
    toggleIsOpen() {
      this.toggleProperty('isOpen');
    }
  }

});
