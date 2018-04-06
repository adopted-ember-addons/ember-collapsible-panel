import { inject as service } from '@ember/service';
import Component from '@ember/component';

// BEGIN-SNIPPET programmatic-control
export default Component.extend({

  panelActions: service(),

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
  }

});
// END-SNIPPET
