/* eslint-disable ember/no-classic-classes, ember/no-classic-components, ember/require-tagless-components, prettier/prettier */
import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
  classNames: 'cp-Panels',
  accordion: false,
  animate: true,

  _cpPanels: true,

  name: oneWay('elementId'),
});
