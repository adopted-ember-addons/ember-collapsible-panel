/* eslint-disable ember/no-computed-properties-in-native-classes, ember/require-tagless-components, ember/no-classic-components */

import { oneWay } from '@ember/object/computed';
import Component from '@ember/component';
import { hash } from '@ember/helper';
import CpPanel from './cp-panel.gjs';

export default class CpPanels extends Component {
  classNames = ['cp-Panels'];
  accordion = false;
  animate = true;

  _cpPanels = true;

  @oneWay('elementId') name;

  <template>
    {{yield (hash panel=(component CpPanel group=this) name=@name)}}
  </template>
}
