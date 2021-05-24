import classic from "ember-classic-decorator";
import Service from "@ember/service";
import { getOwner } from "@ember/application";

@classic
export default class DependencyCheckerService extends Service {
  get hasLiquidFire() {
    let config = getOwner(this).resolveRegistration("config:environment");

    return config["ember-collapsible-panel"].hasLiquidFire;
  }
}
