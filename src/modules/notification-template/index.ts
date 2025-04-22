import { Module } from "@medusajs/framework/utils";
import NotificationTemplateModuleService from "./service";

export const NOTIFICATION_TEMPLATE_MODULE = "notification_template";

export default Module(NOTIFICATION_TEMPLATE_MODULE, {
  service: NotificationTemplateModuleService,
});
