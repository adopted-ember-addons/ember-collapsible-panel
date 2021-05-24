import classic from "ember-classic-decorator";
import {
  classNames,
  layout as templateLayout,
} from "@ember-decorators/component";
import { oneWay } from "@ember/object/computed";
import Component from "@ember/component";
import layout from "./template";

@classic
@templateLayout(layout)
@classNames("cp-Panels")
export default class CpPanels extends Component {
  accordion = false;
  animate = true;
  _cpPanels = true;

  @oneWay("elementId")
  name;
}
