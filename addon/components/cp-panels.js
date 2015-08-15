import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'cp-Panels',
  accordion: false,
  animate: true,

  _cpPanels: true,

  name: Ember.computed.oneWay('elementId'),
});
