import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  classNames: ['cp-Panel-body'],
  classNameBindings: ['isOpen:cp-is-open']

});
