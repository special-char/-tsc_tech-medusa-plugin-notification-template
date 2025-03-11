import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { ModuleOptions } from "../../../modules/notification-template/service";
import switchEventStep from "./steps/switch-event-step";
import checkSubscriberStep from "./steps/custom-subscriber-step";
import { emitEventStep } from "@medusajs/medusa/core-flows";

type WorkflowInput = {
  options: ModuleOptions;
  name: string;
  data: Record<string, any>;
};

export const subscriberWorkflow = createWorkflow(
  "subscriber-workflow",
  function (input: WorkflowInput) {
    const { options, name, data } = input;
    const { subscriberId } = checkSubscriberStep({
      options,
      name,
    });
    if (subscriberId) {
      emitEventStep({
        eventName: subscriberId,
        data: data as any,
      });
    }
    switchEventStep({
      name,
      options,
      data,
    });
    return new WorkflowResponse(" Subscriber called");
  }
);
