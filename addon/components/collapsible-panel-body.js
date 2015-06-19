import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['cp-Panel-body', 'collapse'],
  classNameBindings: ['isOpen:cp-is-open'],

  isOpen: Ember.computed.alias('panelComponent.isOpen'),
  isCollapsing: false,
  isOpenOrCollapsing: Ember.computed.or('isOpen', 'isCollapsing'),

  setup: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      this.$().toggleClass('in', this.get('isOpen'));
      this.$().collapse({toggle: false});
      this.set('isCollapsing', false);
    });
  }),

  // TODO: add willDestroyElement cleanup

  toggleOpen: Ember.observer('isOpen', function() {
    this.set('isCollapsing', true);

    Ember.run.scheduleOnce('afterRender', this, function() {
      var action = this.get('isOpen') ? 'show' : 'hide';

      this.$().collapse(action);

      this.$().on('hide.bs.collapse show.bs.collapse', () => {
        this.set('isCollapsing', true);
      });
      this.$().on('hidden.bs.collapse shown.bs.collapse', () => {
        this.set('isCollapsing', false);
      });
    });
  })

});
