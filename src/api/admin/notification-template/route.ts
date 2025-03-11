import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { MedusaError } from "@medusajs/framework/utils";
import NotificationTemplateModuleService from "../../../modules/notification-template/service";
import { NOTIFICATION_TEMPLATE_MODULE } from "../../../modules/notification-template";

type PostAdminCreateNotificationTemplateType = {
  event_name: string;
  template: string;
  subject: string;
  to: string;
  cc: string;
  bcc: string;
};

export const POST = async (
  req: MedusaRequest<PostAdminCreateNotificationTemplateType>,
  res: MedusaResponse
) => {
  const notificationTemplateModuleService: NotificationTemplateModuleService =
    req.scope.resolve(NOTIFICATION_TEMPLATE_MODULE);

  const notificationExist =
    await notificationTemplateModuleService.listNotificationTemplates({
      event_name: req.body.event_name,
    });

  if (
    notificationExist &&
    notificationExist[0] &&
    notificationExist[0].event_name == req.body.event_name
  ) {
    throw new MedusaError(
      MedusaError.Types.DUPLICATE_ERROR,
      "Event template is already exist."
    );
  }
  const requestObj = {
    ...req.body,
    cc: req.body.cc || "",
    bcc: req.body.bcc || "",
  };
  const notificationTemplate =
    await notificationTemplateModuleService.createNotificationTemplates(
      requestObj
    );
  res.send({ notificationTemplate });
};

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");
  const notificationTemplateModuleService: NotificationTemplateModuleService =
    req.scope.resolve(NOTIFICATION_TEMPLATE_MODULE);
  const notificationTemplate = await query.graph({
    entity: "notification_template",
    fields: ["*", "event_name"],
  });
  const options = await notificationTemplateModuleService.getOptions();
  console.log(options?.events?.[0]);
  res.send(notificationTemplate);
  //     try {
  //   } catch (error) {
  //     res.send(error).status(500);
  //   }
};
