import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Service.extend({

  hasLiquidFire: Ember.computed('', function() {
    return ENV['ember-collapsible-panel'].hasLiquidFire;
  })

});
