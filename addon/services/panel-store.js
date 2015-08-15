import Ember from 'ember';

export default Ember.Service.extend({
  _registry: Ember.Object.create({
    keys: Ember.A([]),

    unknownProperty: function(name) {
      const state = Ember.Object.create({
        name: name,
        isOpen: false
      });

      this.get('keys').addObject(name);
      this.set(name, state);

      return state;
    },

    // probably not too save, should only be used in
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

  open(name) {
    this._panelFor(name).set('isOpen', true);
  },

  toggle(name) {
    this._panelFor(name).toggleProperty('isOpen');
  },
});
