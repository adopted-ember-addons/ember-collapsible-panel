import Ember from 'ember';

export default Ember.Service.extend({
  _registry: Ember.Object.create({
    keys: Ember.A([]),

    unknownProperty: function(name) {
      const state = Ember.Object.create({
        name: name,
        isOpen: false,
        animate: true,
        group: null
      });

      this.get('keys').addObject(name);
      this.set(name, state);

      return state;
    },

    // probably not too safe, should only be used in
    // tests
    reset() {
      this.get('keys').forEach((key) => {
        delete this[key];
      });

      this.get('keys').clear();
    }
  }),

  state: Ember.computed.readOnly('_registry'),

  _panelFor(name) {
    return this.get(`state.${name}`);
  },

  _panels: Ember.computed('state.keys.[]', function() {
    const keys = this.get('state.keys'),
          state = this.get('state');

    return keys.reduce((result, key) => {
      return result.addObject(state.get(key));
    }, Ember.A([]));
  }),

  _panelsInGroup(name) {
    return this.get('_panels')
      .filterBy('group.name', name);
  },

  open(name) {
    const panel = this._panelFor(name),
          group = panel.get('group');

    if (group && group.get('accordion')) {
      // if this is part of an accordion close
      // everything else
      this.closeAll(group.get('name'));
    }

    panel.set('isOpen', true);
  },

  close(name) {
    this._panelFor(name).set('isOpen', false);
  },

  toggle(name) {
    const panel = this._panelFor(name);
    return panel.get('isOpen') ? this.close(name) : this.open(name);
  },

  openAll(group) {
    this._panelsInGroup(group).forEach((panel) => {
      panel.set('isOpen', true);
    });
  },

  closeAll(group) {
    this._panelsInGroup(group).forEach((panel) => {
      panel.set('isOpen', false);
    });
  }
});
