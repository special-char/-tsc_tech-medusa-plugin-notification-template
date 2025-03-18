import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { NOTIFICATION_TEMPLATE_MODULE } from "../../../../modules/notification-template";
import NotificationTemplateModuleService, {
  ModuleOptions,
} from "../../../../modules/notification-template/service";
import Handlebars from "handlebars";

type WorkflowInput = {
  entityName: string;
  data: Record<string, any>;
  options?: ModuleOptions;
  entityData: any[];
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
};

const sendEmailStep = createStep(
  "send-email-step",
  async (
    { entityName, data, notificationTemplate, entityData }: WorkflowInput,
    { container }
  ) => {
    try {
      const cacheModuleService = container.resolve(Modules.CACHE);

      const extraData: Record<string, any> | null =
        await cacheModuleService.get("extraData");
      // const query = container.resolve(ContainerRegistrationKeys.QUERY);

      const notificationService = container.resolve("notification");

      // const { data: entityData } = await query.graph({
      //   entity: entityName,
      //   filters: { id: data.id },
      //   fields: ["*", "*.*"],
      // });
      if (!entityData.length) {
        console.warn(`No entity data found for ID: ${data.id}`);
        return;
      }

      const entityDetails = {
        ...(entityData[0] && { ...entityData[0] }),
        ...(extraData && { ...extraData }),
      };

      const compileAndParseEmails = (template?: string): string[] => {
        if (!template) return [];
        return Handlebars.compile(template)(entityDetails)
          .split(",")
          .map((email) => email.trim())
          .filter((email) => email);
      };

      const templateBody = {
        emailBody: Handlebars.compile(notificationTemplate.template)(
          entityDetails
        ),
        to: compileAndParseEmails(notificationTemplate.to),
        cc: compileAndParseEmails(notificationTemplate.cc),
        bcc: compileAndParseEmails(notificationTemplate.bcc),
        subject: Handlebars.compile(notificationTemplate.subject)(
          entityDetails
        ),
      };
      const response = await notificationService.createNotifications([
        {
          channel: "email",
          to: Array.isArray(templateBody.to)
            ? templateBody.to[0]
            : (templateBody.to as unknown as string),
          data: {
            ...notificationTemplate,
            ...templateBody,
          } as unknown as any,
          template: templateBody.emailBody,
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
