import { MedusaService, Modules } from "@medusajs/framework/utils";
import { NotificationTemplate } from "./models/notification-template";
import { MedusaContainer } from "@medusajs/framework";

export type ModuleOptions = {
  events?: Record<string, { subscriberId?: string }>;
};
class NotificationTemplateModuleService extends MedusaService({
  NotificationTemplate,
}) {
  protected _options: ModuleOptions;
  constructor(props: {}, options?: ModuleOptions) {
    super(props);
    this._options = options!;
  }
  async getOptions() {
    return this._options;
  }

  setExtraData(extraData: Record<string, any>, container: MedusaContainer) {
    const cacheModuleService = container.resolve(Modules.CACHE);
    cacheModuleService.set("extraData", extraData);
  }
}

export default NotificationTemplateModuleService;
