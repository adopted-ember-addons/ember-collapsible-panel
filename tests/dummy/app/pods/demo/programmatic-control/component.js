/* eslint-disable ember/no-actions-hash, ember/no-classic-classes, ember/no-classic-components, ember/no-get, ember/require-tagless-components, prettier/prettier */
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

    openPanelA() {
      this.get('panelActions').open('panelA');
    },

    closePanelA() {
      this.get('panelActions').close('panelA');
    }
  }

});
// END-SNIPPET
