/* eslint-disable ember/no-classic-components, ember/no-computed-properties-in-native-classes, ember/require-tagless-components, no-unused-vars */
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
    return this.isOpen ? 'true' : 'false';
  }

  click(e) {
    e.preventDefault();
    this['on-click']();
  }

  <template>{{yield}}</template>
}
