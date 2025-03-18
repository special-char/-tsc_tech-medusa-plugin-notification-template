// import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
// import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
// import { NOTIFICATION_TEMPLATE_MODULE } from "../../../../modules/notification-template";
// import NotificationTemplateModuleService from "../../../../modules/notification-template/service";
// import Handlebars from "handlebars";

// type WorkflowInput = {
//   name: string;
//   data: Record<string, any>;
// };

// const sendEmailStep = createStep(
//   "send-email-step",
//   async ({ name, data }: WorkflowInput, { container }) => {
//     const query = container.resolve(ContainerRegistrationKeys.QUERY);
//     const notificationService = container.resolve("notification");
//     const notificationTemplateService: NotificationTemplateModuleService =
//       container.resolve(NOTIFICATION_TEMPLATE_MODULE);
//     const notificationTemplateData =
//       await notificationTemplateService.listNotificationTemplates(
//         {
//           event_name: name,
//         },
//         {}
//       );
//     const { data: entityData } = await query.graph({
//       entity: name?.split(".")?.[0]?.replaceAll("-", "_")! as string,
//       filters: {
//         id: data.id,
//       },
//       fields: ["*", "*.*"],
//     });
//     const entityDetails = entityData[0];
//     if (!entityDetails) {
//       return;
//     }
//     const bodyTemplate = Handlebars.compile(
//       notificationTemplateData[0].template
//     );
//     const subjectTemplate = Handlebars.compile(
//       notificationTemplateData[0].subject
//     );
//     const toTemplate = Handlebars.compile(
//       notificationTemplateData[0]?.to ?? ""
//     );
//     const ccTemplate = Handlebars.compile(
//       notificationTemplateData[0]?.cc ?? ""
//     );
//     const bccTemplate = Handlebars.compile(
//       notificationTemplateData[0]?.bcc ?? ""
//     );

//     const templateBody = {
//       emailBody: bodyTemplate(entityDetails),
//       to: toTemplate(entityDetails),
//       cc: ccTemplate(entityDetails),
//       bcc: bccTemplate(entityDetails),
//       subject: subjectTemplate(entityDetails),
//     };

//     const response = await notificationService.createNotifications([
//       {
//         channel: "email",
//         to: templateBody.to,
//         data: {
//           ...notificationTemplateData,
//           ...templateBody,
//         } as unknown as any,
//         template: templateBody.emailBody,
//         content: { entityData } as unknown as any,
//       },
//     ]);
//     return new StepResponse(response);
//   }
// );

// export default sendEmailStep;

import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import { NOTIFICATION_TEMPLATE_MODULE } from "../../../../modules/notification-template";
import NotificationTemplateModuleService, {
  ModuleOptions,
} from "../../../../modules/notification-template/service";
import Handlebars from "handlebars";

type WorkflowInput = {
  name: string;
  data: Record<string, any>;
  options?: ModuleOptions;
};

const sendEmailStep = createStep(
  "send-email-step",
  async ({ name, data }: WorkflowInput, { container }) => {
    try {
      const cacheModuleService = container.resolve(Modules.CACHE);

      const extraData: Record<string, any> | null =
        await cacheModuleService.get("extraData");

      const query = container.resolve(ContainerRegistrationKeys.QUERY);

      const notificationService = container.resolve("notification");

      const notificationTemplateService: NotificationTemplateModuleService =
        container.resolve(NOTIFICATION_TEMPLATE_MODULE);
      console.log({ name, data });

      const [notificationTemplate] =
        await notificationTemplateService.listNotificationTemplates(
          { event_name: name },
          {}
        );
      console.log("notificationTemplatenotificationTemplate", {
        notificationTemplate,
      });

      if (!notificationTemplate) {
        console.warn(`No notification template found for event: ${name}`);
        return;
      }
      const entityName = name?.split(".")?.[0]?.replaceAll("-", "_");
      if (!entityName) {
        console.warn(`Invalid entity name derived from event: ${name}`);
        return;
      }

      const { data: entityData } = await query.graph({
        entity: entityName,
        filters: { id: data.id },
        fields: ["*", "*.*"],
      });
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
          .filter((email) => email); // Remove empty values
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
      console.log("templateBody.emailBody", templateBody, entityDetails);

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
