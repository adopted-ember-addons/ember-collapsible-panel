import Ember from 'ember';

/*
  Passed-in:
    is-open. bind to panel's open/close state
*/
export default Ember.Component.extend({

  classNames: 'cp-Panel',
  classNameBindings: ['isOpen:cp-is-open'],

  isOpen: Ember.computed.alias('is-open'),

  /*
    Hacky way to wire up this panel's toggle
    and collapsible child components.
  */
  wireUpComponents: Ember.on('didInsertElement', function() {
    var toggleId = this.$('.cp-Panel-toggle')
      .not(this.$('.cp-Panel').find('.cp-Panel-toggle'))
      .attr('id');

    var collapsibleId = this.$('.cp-Panel-body')
      .not(this.$('.cp-Panel').find('.cp-Panel-body'))
      .attr('id');

    this.set('toggleComponent', Ember.View.views[toggleId]);
    this.get('toggleComponent').set('panelComponent', this);
    this.set('collapsibleComponent', Ember.View.views[collapsibleId]);
    this.get('collapsibleComponent').set('panelComponent', this);

    this.set('isOpen', this.get('isOpen') || false);
  }),

  handleToggle: function() {
    /*
      This is a hack. Only way I could get TWBS collapse to have no
      animation (which I want on mobile) was to add some css. But,
      the plugin still uses the duration, so for ~350ms there is a
      'collapsing' class. We need to wait for this to be "done" or
      else stuff gets out of sync.
    */
    var isCollapsing = this.get('collapsibleComponent').$().hasClass('collapsing');

    if (!isCollapsing) {
      this.toggleProperty('isOpen');
    }
  },

  getSiblingPanels: function() {
    var panels = [];

    this.$().siblings('.cp-Panel').each(function(i, panel) {
      var panelId = Ember.$(panel).attr('id');

      panels.push(Ember.View.views[panelId]);
    });

    return Ember.A(panels);
  },

  // closeSiblingsOnOpen: Ember.observer('isOpen', function() {
  //   var siblings = this.getSiblingPanels();

  //   if (this.get('isOpen') && siblings) {
  //     siblings.setEach('isOpen', false);
  //   }
  // }),

  actions: {
    closePanel: function() {
      this.set('isOpen', false);
    }
  }

});
