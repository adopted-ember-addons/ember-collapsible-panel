import Ember from 'ember';

export default Ember.Component.extend({

  classNames: 'cp-Panels',
  accordion: false,
  panels: Ember.A(),
  openPanels: Ember.A(),

  _cpPanels: true,

  registerPanel(panel) {
    this.get('panels').pushObject(panel);
  },

  unregisterPanel(panel) {
    if (this.get('openPanels').contains(panel)) {
      this.get('openPanels').removeObject(panel);
    }

    this.get('panels').removeObject(panel);
  },

  togglePanel(panel) {
    if (this.get('openPanels').contains(panel)) {
      this._closePanel(panel);
    } else {
      this._openPanel(panel);
    }
  },

  _closePanel(panel) {
    this.get('openPanels').removeObject(panel);
  },

  _openPanel(panel) {
    var openPanels = this.get('openPanels');

    if (this.get('accordion')) {
      openPanels.replace(0, 1, panel);
    } else {
      openPanels.pushObject(panel);
    }
  }
});
