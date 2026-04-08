import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default class CpPanelToggle extends Component {
  tagName = 'a';
  classNames = ['cp-Panel-toggle'];
  classNameBindings = ['isOpen:cp-is-open'];

  // So taps register in iOS
  attributeBindings = ['href', 'ariaExpanded:aria-expanded'];
  href = '#';

  @computed('isOpen')
  get ariaExpanded() {
    return get(this, 'isOpen') ? 'true' : 'false';
  }

  click(e) {
    e.preventDefault();
    this['on-click']();
  }

  <template>{{yield}}</template>
}
