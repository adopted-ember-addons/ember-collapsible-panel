import Ember from 'ember';

export default Ember.Component.extend({

  _cpPanelBody: true,

  // classNames: ['cp-Panel-body', 'collapse'],
  classNames: ['cp-Panel-body'],
  classNameBindings: ['isOpen:cp-is-open'],

  isOpen: Ember.computed.readOnly('panelComponent.isOpen'),
  isCollapsing: false,
  isOpenOrCollapsing: Ember.computed.or('isOpen', 'isCollapsing'),

  setup: Ember.on('didInsertElement', function() {

    // Register with component
    var panel = this.nearestWithProperty('_cpPanel');
    this.set('panelComponent', panel);
    panel.register('collapsibleComponent', this);

    Ember.run.scheduleOnce('afterRender', this, function() {
      this.$().toggleClass('in', this.get('isOpen'));
      this.$().collapse({toggle: false});
      this.set('isCollapsing', false);
    });
  }),

  // TODO: add willDestroyElement cleanup

  // toggleOpen: Ember.observer('isOpen', function() {
  //   this.set('isCollapsing', true);

  //   Ember.run.scheduleOnce('afterRender', this, function() {
  //     var action = this.get('isOpen') ? 'show' : 'hide';

  //     this.$().collapse(action);

  //     this.$().on('hide.bs.collapse show.bs.collapse', () => {
  //       this.set('isCollapsing', true);
  //     });
  //     this.$().on('hidden.bs.collapse shown.bs.collapse', () => {
  //       this.set('isCollapsing', false);
  //     });
  //   });
  // })

});
