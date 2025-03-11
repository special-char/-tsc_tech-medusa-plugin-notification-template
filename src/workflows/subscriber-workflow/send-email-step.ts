import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
// import Handlebars from "handlebars";
import { ModuleOptions } from "../../modules/notification-template/service";

type WorkflowInput = {
  options: ModuleOptions;
  name: string;
  data: Record<string, any>;
};

const sendEmailStep = createStep(
  "send-email-step",
  async ({ options, name, data }: WorkflowInput, { container }) => {
    const notificationService = container.resolve("notification");
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const notiTemplate = await query.graph({
      fields: ["*", "event_id.*"],
      entity: "notification_template",
      filters: {
        event_id: {
          eventName: name,
        } as unknown as undefined,
      },
    });
    let emailBody: string;
    if (notiTemplate.data.length || true) {
      console.log("notiTemplate::::::", notiTemplate);
    }
    console.log("product-updated-workflow-step", { options, name });
    const response = await notificationService.createNotifications([
      {
        channel: "email",
        to: "harzh.patel@gmail.com",
        template: "emailBody",
      },
    ]);
    console.log("notificationService.createNotifications", response);

    return new StepResponse({ response });
  }
);

export default sendEmailStep;
