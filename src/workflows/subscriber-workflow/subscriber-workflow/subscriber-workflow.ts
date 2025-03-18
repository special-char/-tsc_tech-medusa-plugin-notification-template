import {
  createHook,
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { ModuleOptions } from "../../../modules/notification-template/service";
import sendEmailStep from "./steps/send-email-step";

type WorkflowInput = {
  options: ModuleOptions;
  name: string;
  data: Record<string, any>;
};

export const subscriberWorkflow = createWorkflow(
  "subscriber-workflow",
  function (input: WorkflowInput) {
    const { name, data } = input;

    const hookData = createHook("subscriberHook", {
      name,
      data,
    });

    sendEmailStep({ name, data });

    return new WorkflowResponse(" Subscriber called", {
      hooks: [hookData],
    });
  }
);
