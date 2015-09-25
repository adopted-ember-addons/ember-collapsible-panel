import Ember from 'ember';

export default Ember.Component.extend({

  isOpen: false,

  actions: {
    toggleIsOpen() {
      this.toggleProperty('isOpen');
    }
  }

});
