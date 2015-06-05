import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggle() {
      this.toggleProperty('panelIsOpen');
    }
  }
});
