import classic from "ember-classic-decorator";
import {
  classNames,
  classNameBindings,
  layout as templateLayout,
} from "@ember-decorators/component";
import Component from "@ember/component";
import layout from "./template";

@classic
@templateLayout(layout)
@classNames("cp-Panel-body")
@classNameBindings("isOpen:cp-is-open")
export default class CpPanelBody extends Component {}
