import classic from "ember-classic-decorator";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";

// BEGIN-SNIPPET programmatic-control
@classic
export default class ProgrammaticControl extends Component {
  @service
  panelActions;

  @action
  expandAll() {
    this.panelActions.openAll("group1");
  }

  @action
  collapseAll() {
    this.panelActions.closeAll("group1");
  }

  @action
  togglePanelA() {
    this.panelActions.toggle("panelA");
  }

  @action
  togglePanelB() {
    this.panelActions.toggle("panelB");
  }

  @action
  openPanelA() {
    this.panelActions.open("panelA");
  }

  @action
  closePanelA() {
    this.panelActions.close("panelA");
  }
}
// END-SNIPPET
