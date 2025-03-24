import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";

type WorkflowInput = {
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
  entityDetails: any;
  templateBody: {
    emailBody: string;
    to: string[];
    cc: string[];
    bcc: string[];
    subject: string;
  };
};

const sendEmailStep = createStep(
  "send-email-step",
  async (
    { notificationTemplate, entityDetails, templateBody }: WorkflowInput,
    { container }
  ) => {
    try {
      const notificationService = container.resolve("notification");

      if (!notificationTemplate || !entityDetails || !templateBody) {
        console.warn(`No notification template or data found for this event`);
        return new StepResponse();
      }
      const cacheModuleService = container.resolve(Modules.CACHE);

      const response = await notificationService.createNotifications([
        {
          channel: "email",
          to: Array.isArray(templateBody?.to)
            ? templateBody?.to[0]
            : (templateBody?.to as unknown as string),
          data: {
            ...notificationTemplate,
            ...templateBody,
          } as unknown as any,
          template: templateBody?.emailBody,
          content: { entityDetails } as unknown as any,
        },
      ]);
      cacheModuleService.invalidate("extraData");
      return new StepResponse(response);
    } catch (error) {
      console.error("Error in sendEmailStep:", error);
      throw error;
    }
  }
);

export default sendEmailStep;
