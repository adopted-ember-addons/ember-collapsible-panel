import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ted-panel-collapse', 'collapse'],
  classNameBindings: ['isOpen:ted-panel-collapse-open'],

  isOpen: Ember.computed.alias('panelComponent.isOpen'),

  setup: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.$().toggleClass('in', this.get('isOpen'));
      this.$().collapse({toggle: false});
    });
  }),

  // TODO: add willDestroyElement cleanup

  toggleOpen: Ember.observer('isOpen', function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      var action = this.get('isOpen') ? 'show' : 'hide';

      this.$().collapse(action);
    });
  })

});
