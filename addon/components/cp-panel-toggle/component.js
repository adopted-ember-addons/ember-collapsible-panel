import classic from "ember-classic-decorator";
import {
  classNames,
  attributeBindings,
  classNameBindings,
  tagName,
} from "@ember-decorators/component";
import Component from "@ember/component";
import { computed } from "@ember/object";

@classic
@tagName("a")
@classNames("cp-Panel-toggle")
@classNameBindings("isOpen:cp-is-open")
@attributeBindings("href", "ariaExpanded:aria-expanded")
export default class CpPanelToggle extends Component {
  href = "#";

  @computed("isOpen")
  get ariaExpanded() {
    return this.isOpen ? "true" : "false";
  }

  click(e) {
    e.preventDefault();
    this["on-click"]();
  }
}
