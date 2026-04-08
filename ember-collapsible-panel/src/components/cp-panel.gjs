import { scheduleOnce } from '@ember/runloop';
import { computed, action, get, set } from '@ember/object';
import { and, oneWay, readOnly, not } from '@ember/object/computed';
import { macroCondition, dependencySatisfies } from '@embroider/macros';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { hash } from '@ember/helper';
import CpPanelToggle from './cp-panel-toggle.gjs';
import CpPanelBody from './cp-panel-body.gjs';

let hasLiquidFireDep;
if (macroCondition(dependencySatisfies('liquid-fire', '*'))) {
  hasLiquidFireDep = true;
} else {
  hasLiquidFireDep = false;
}

console.log(hasLiquidFireDep);

export default class CpPanel extends Component {
  @service panelActions;

  @and('hasLiquidFireDep', 'animate') shouldAnimate;

  disabled = false;
  hasLiquidFireDep = hasLiquidFireDep;

  group = null; // passed in if rendered as part of a {{cp-panels}} group

  classNames = ['cp-Panel'];
  classNameBindings = [
    'isOpen:cp-is-open:cp-is-closed',
    'disabled:cp-is-disabled',
  ];

  // Caller can overwrite
  @oneWay('elementId') name;

  @computed('name')
  get panelState() {
    const name = get(this, 'name');
    return get(this, `panelActions.state.${name}`);
  }

  @readOnly('panelState.isOpen') isOpen;
  @not('isOpen') isClosed;

  panelsWrapper = null;
  animate = true;

  didReceiveAttrs() {
    super.didReceiveAttrs(...arguments);

    // If caller passes in open=, use it
    if (get(this, 'open') !== undefined) {
      set(this, 'panelState.boundOpenState', get(this, 'open'));
    }
  }

  // Register with parent panels component
  didInsertElement() {
    super.didInsertElement(...arguments);
    scheduleOnce('afterRender', () => {
      let group = get(this, 'group');

      if (group) {
        set(get(this, 'panelState'), 'group', group);
      }
    });
  }

  // Custom action called when toggling that can be provided by caller
  didToggle() {}

  @action
  toggleIsOpen() {
    if (get(this, 'disabled')) {
      return;
    }
    let name = get(this, 'name');

    get(this, 'panelActions').toggle(name);

    this.didToggle(name);
  }

  <template>
    {{yield
      (hash
        toggle=(component
          CpPanelToggle on-click=this.toggleIsOpen isOpen=this.isOpen
        )
        body=(component
          CpPanelBody shouldAnimate=this.shouldAnimate isOpen=this.isOpen
        )
        name=this.name
        isOpen=this.isOpen
      )
    }}
  </template>
}
