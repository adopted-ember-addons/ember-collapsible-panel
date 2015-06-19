import Ember from 'ember';

export default Ember.Component.extend({

  classNames: 'cp-Panels',

  wireUpComponents: Ember.on('didInsertElement', function() {
    /*
      Hacky way to wire up related components.
    */
    var panels = [];

    this.$('.cp-Panel').each(function(i, panel) {
      var panelId = Ember.$(panel).attr('id');

      panels.push(Ember.View.views[panelId]);
    });

    this.set('panels', panels);
  }),

  updateStuff: Ember.observer('panels.@each.isOpen', function() {
    if (this.get('alreadyOpen')) {
      this.get('alreadyOpen').setEach('isOpen', false);
    }

    var alreadyOpen = this.get('panels').filterBy('isOpen');

    this.set('alreadyOpen', alreadyOpen);
  })

});
