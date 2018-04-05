import { readOnly } from '@ember/object/computed';
import { A } from '@ember/array';
import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';

const State = EmberObject.extend({
  name: null,
  boundOpenState: false,
  apiOpenState: false,
  apiWasUsed: false,

  isOpen: computed('boundOpenState', 'apiOpenState', 'apiWasUsed', function() {
    if (this.get('apiWasUsed')) {
      return this.get('apiOpenState');
    } else {
      return this.get('boundOpenState');
    }
  }),

  animate: true,
  group: null
});

export default Service.extend({
  _registry: EmberObject.create({
    keys: A([]),

    unknownProperty: function(name) {
      const state = State.create();

      this.get('keys').addObject(name);
      this.set(name, state);

      return state;
    },

    // probably not too safe, should only be used in tests
    reset() {
      this.get('keys')
        .map(i => i) // copy, so we dont mess with binding/loops
        .forEach((key) => {
          delete this[key];
        });

      this.get('keys').clear();
    }
  }),

  state: readOnly('_registry'),

  _panelFor(name) {
    return this.get(`state.${name}`);
  },

  _panels: computed('state.keys.[]', function() {
    const keys = this.get('state.keys'),
          state = this.get('state');

    return keys.reduce((result, key) => {
      return result.addObject(state.get(key));
    }, A([]));
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

    panel.set('apiOpenState', true);
    panel.set('apiWasUsed', true);
  },

  close(name) {
    this._panelFor(name).set('apiOpenState', false);
    this._panelFor(name).set('apiWasUsed', true);
  },

  toggle(name) {
    let panel = this._panelFor(name);
    return panel.get('isOpen') ? this.close(name) : this.open(name);
  },

  openAll(group) {
    this._panelsInGroup(group).forEach((panel) => {
      panel.set('apiOpenState', true);
      panel.set('apiWasUsed', true);
    });
  },

  closeAll(group) {
    this._panelsInGroup(group).forEach((panel) => {
      panel.set('apiOpenState', false);
      panel.set('apiWasUsed', true);
    });
  }
});
