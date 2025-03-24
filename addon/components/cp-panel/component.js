import { classNameBindings, classNames, layout as templateLayout } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { not, readOnly, oneWay, and } from '@ember/object/computed';
/* eslint-disable ember/no-actions-hash, ember/no-classic-classes, ember/no-classic-components, ember/no-component-lifecycle-hooks, ember/no-get, ember/no-incorrect-calls-with-inline-anonymous-functions, ember/require-tagless-components, prettier/prettier */
import { scheduleOnce } from '@ember/runloop';
import { macroCondition, dependencySatisfies } from '@embroider/macros';
import Component from '@ember/component';
import layout from './template';

let hasLiquidFireDep;
if (macroCondition(dependencySatisfies('liquid-fire', '*'))) {
  hasLiquidFireDep = true;
} else {
  hasLiquidFireDep = false;
}

@templateLayout(layout)
@classNames('cp-Panel')
@classNameBindings('isOpen:cp-is-open:cp-is-closed', 'disabled:cp-is-disabled')
export default class CpPanel extends Component {
  @service
  panelActions;

  @and('hasLiquidFireDep', 'animate')
  shouldAnimate;

  disabled = false;
  hasLiquidFireDep = hasLiquidFireDep;
  group = null; // passed in if rendered as part of a {{cp-panels}} group

  // Caller can overwrite
  @oneWay('elementId')
  name;

  @computed('name')
  get panelState() {
    const name = this.get('name');
    return this.get(`panelActions.state.${name}`);
  }

  @readOnly('panelState.isOpen')
  isOpen;

  @not('isOpen')
  isClosed;

  panelsWrapper = null;
  animate = true;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    // If caller passes in open=, use it
    if (this.get('open') !== undefined) {
      this.set('panelState.boundOpenState', this.get('open'));
    }
  }

  // Register with parent panels component
  didInsertElement() {
    super.didInsertElement(...arguments);
    scheduleOnce('afterRender', () => {
      let group = this.get('group');

      if (group) {
        this.get('panelState').set('group', group);
      }
    });
  }

  // Custom action called when toggling that can be provided by caller
  didToggle() {}

  @action
  toggleIsOpen() {
    if (this.get("disabled")) {
      return;
    }
    let name = this.get('name');

    this.get('panelActions').toggle(name);

    this.didToggle(name);
  }
}
