import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,
  
  classNames: 'cp-Panels',
  accordion: false,
  animate: true,

  _cpPanels: true,

  name: oneWay('elementId'),
});
