import { computed } from '@ember/object';
import Service from '@ember/service';
import { getOwner } from '@ember/application';

export default Service.extend({

  hasLiquidFire: computed('', function() {
    let config = getOwner(this).resolveRegistration('config:environment')

    return config['ember-collapsible-panel'].hasLiquidFire;
  })

});
