import { model } from "@medusajs/framework/utils";
export const NotificationTemplate = model.define("notification-template", {
  id: model.id().primaryKey(),
  template: model.text(),
  subject: model.text(),
  event_name: model.text(),
  to: model.text(),
  cc: model.text(),
  bcc: model.text(),
});
