import {
  createHook,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import sendEmailStep from "./steps/send-email-step";
import { getNotificationTemplateStep } from "./steps/get-notification-template-step";
import { getEntityNameStep } from "./steps/get-entity-name-step";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";

type WorkflowInput = {
  name: string;
  data: Record<string, any>;
};

export const subscriberWorkflow = createWorkflow(
  "subscriber-workflow",
  function (input: WorkflowInput) {
    const { name, data } = input;

    const subscriberHook = createHook("subscriberHook", {
      name,
      data,
    });

    const { entityName } = getEntityNameStep({ name });

    const { notificationTemplate } = getNotificationTemplateStep({
      name,
    });

    const { data: entityData } = useQueryGraphStep({
      entity: entityName,
      filters: { id: data.id },
      fields: ["*", "*.*"],
    });

    sendEmailStep({ entityName, data, notificationTemplate, entityData });

    return new WorkflowResponse(" Subscriber called", {
      hooks: [subscriberHook],
    });
  }
);
