import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,
  
  classNames: 'cp-Panels',
  accordion: false,
  animate: true,

  _cpPanels: true,

  name: Ember.computed.oneWay('elementId'),
});
