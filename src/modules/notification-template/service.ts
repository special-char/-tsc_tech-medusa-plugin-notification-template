import { MedusaService } from "@medusajs/framework/utils";
import { NotificationTemplate } from "./models/notification-template";

export type ModuleOptions = {
  events?: Record<
    string,
    {
      subscriberId: string;
    }
  >;
};
class NotificationTemplateModuleService extends MedusaService({
  NotificationTemplate,
}) {
  protected _options: ModuleOptions;
  constructor(props: {}, options?: ModuleOptions) {
    super(props);
    this._options = options || {
      events: {
        "product.create": {
          subscriberId: "",
        },
      },
    };
  }
  async getOptions() {
    return this._options;
  }
}

export default NotificationTemplateModuleService;
