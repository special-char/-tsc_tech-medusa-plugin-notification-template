import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import NotificationTemplateModuleService from "../../../../modules/notification-template/service";
import { NOTIFICATION_TEMPLATE_MODULE } from "../../../../modules/notification-template";

type WorkflowInput = {
  name: string;
  data: Record<string, any>;
};
export const getNotificationStep = createStep(
  "get-notification-template-step",
  async function (input: WorkflowInput, { container }) {
    const { name, data } = input;
    const notificationTemplateService: NotificationTemplateModuleService =
      container.resolve(NOTIFICATION_TEMPLATE_MODULE);
    console.log({ name, data });

    const [notificationTemplate] =
      await notificationTemplateService.listNotificationTemplates(
        { event_name: name },
        {}
      );

    if (!notificationTemplate) {
      console.warn(`No notification template found for event: ${name}`);
      return new StepResponse();
    }
    return new StepResponse({ notificationTemplate });
  }
);
