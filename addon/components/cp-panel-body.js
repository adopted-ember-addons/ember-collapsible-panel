import Ember from 'ember';

export default Ember.Component.extend({

  _cpPanelBody: true,

  // classNames: ['cp-Panel-body', 'collapse'],
  classNames: ['cp-Panel-body', 'closed'],
  classNameBindings: ['isOpen:cp-is-open'],

  isOpen: Ember.computed.readOnly('panelComponent.isOpen'),
  shouldTransition: Ember.computed.readOnly('panelComponent.transition'),
  isCollapsing: false,
  isOpenOrCollapsing: Ember.computed.or('isOpen', 'isCollapsing'),

  setup: Ember.on('didInsertElement', function() {

    // Register with component
    var panel = this.nearestWithProperty('_cpPanel');
    this.set('panelComponent', panel);
    panel.register('bodyComponent', this);

    // Ember.run.scheduleOnce('afterRender', this, function() {
    //   // this.$().toggleClass('in', this.get('isOpen'));
    //   // this.$().collapse({toggle: false});
    //   this.set('isCollapsing', false);
    // });

    // Ember.run.next(this, function() {
    //   var height = this.$('.cp-Panel-body-inner').actual('height');
    //   // console.log(height);
    //   this.$().css({height: height});
    // });

  }),


  toggle() {
    var shouldTransition = this.get('shouldTransition');

    if (shouldTransition) {
      this.set('isCollapsing', true);

      Ember.run.next(this, function() {
        this.$().slideToggle(250, () => {
          this.set('isCollapsing', false);
        });
      });

    } else {
      this.$().toggle();
    }
    //   // var height = this.$('.cp-Panel-body-inner').actual('height');
    //   var height = this.$('.cp-Panel-body-inner').outerHeight();
    //   var currentHeight = this.$().height();
    //   this.$().css({height: currentHeight ? 0 : height});
    // });
    // if (this.$().hasClass('closed')) {
    //   this.$()
    //     .css({height: 0})
    //     .removeClass('closed');

    //   Ember.run.next(this, function() {
    //     this.$().css({
    //       height: height
    //     });
    //   });
    // } else {
    //   this.$().css({
    //     height: 0
    //   });
    // }
    // Ember.run.later(this, function() {
    //   this.$().css({
    //     height: height
    //   });
    // }, 1);

  }

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
