import { computed } from '@ember/object';
import Service from '@ember/service';
import ENV from '../config/environment';

export default Service.extend({

  hasLiquidFire: computed('', function() {
    return ENV['ember-collapsible-panel'].hasLiquidFire;
  })

});
