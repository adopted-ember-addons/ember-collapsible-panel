import Ember from 'ember';

export default Ember.Controller.extend({
  panelIsOpen: null,
  actions: {
    toggle() {
      this.toggleProperty('panelIsOpen');
    }
  }
});
