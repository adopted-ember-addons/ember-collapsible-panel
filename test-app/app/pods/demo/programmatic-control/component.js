/* eslint-disable ember/no-actions-hash, ember/no-classic-classes, ember/no-classic-components, ember/no-get, ember/require-tagless-components, prettier/prettier */
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { action } from '@ember/object';

// BEGIN-SNIPPET programmatic-control
export default Component.extend({
  panelActions: service(),

  expandAll: action(function () {
    this.get('panelActions').openAll('group1');
  }),

  collapseAll: action(function () {
    this.get('panelActions').closeAll('group1');
  }),

  togglePanelA: action(function () {
    this.get('panelActions').toggle('panelA');
  }),

  togglePanelB: action(function () {
    this.get('panelActions').toggle('panelB');
  }),

  openPanelA: action(function () {
    this.get('panelActions').open('panelA');
  }),

  closePanelA: action(function () {
    this.get('panelActions').close('panelA');
  }),
});
// END-SNIPPET
