import classic from "ember-classic-decorator";
import { action } from "@ember/object";
import Component from "@ember/component";

@classic
export default class OneWayBinding extends Component {
  isOpen = false;

  @action
  toggleIsOpen() {
    this.toggleProperty("isOpen");
  }
}
