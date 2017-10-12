import Ember from 'ember';

// BEGIN-SNIPPET programmatic-control
export default Ember.Component.extend({

  panelActions: Ember.inject.service(),

  actions: {
    expandAll() {
      this.get('panelActions').openAll('group1');
    },

    collapseAll() {
      this.get('panelActions').closeAll('group1');
    },

    togglePanelA() {
      this.get('panelActions').toggle('panelA');
    },

    togglePanelB() {
      this.get('panelActions').toggle('panelB');
    },

    openPanelA() {
      this.get('panelActions').open('panelA');
    },

    closePanelA() {
      this.get('panelActions').close('panelA');
    }
  }

});
// END-SNIPPET
