import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import NotificationTemplateModuleService from "../../../../modules/notification-template/service";
import { NOTIFICATION_TEMPLATE_MODULE } from "../../../../modules/notification-template";

type WorkflowInput = {
  name: string;
};
export const getNotificationTemplateStep = createStep(
  "get-notification-template-step",
  async function (
    input: WorkflowInput,
    { container }
  ): Promise<
    StepResponse<{
      notificationTemplate: {
        id: string;
        template: string;
        subject: string;
        event_name: string;
        to: string;
        cc: string;
        bcc: string;
        created_at: Date;
        updated_at: Date;
        deleted_at: Date | null;
      };
    }>
  > {
    const { name } = input;
    const notificationTemplateService: NotificationTemplateModuleService =
      container.resolve(NOTIFICATION_TEMPLATE_MODULE);
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
