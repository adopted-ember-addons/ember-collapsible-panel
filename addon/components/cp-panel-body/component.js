import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout,

  classNames: ['cp-Panel-body'],
  classNameBindings: ['isOpen:cp-is-open']

});
