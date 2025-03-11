import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { emitEventStep } from "@medusajs/medusa/core-flows";
import { ModuleOptions } from "../../../../modules/notification-template/service";
import productUpdatedWorkflowStep from "./product-updated-workflow-step";

type WorkflowInput = {
  options: ModuleOptions;
  name: string;
  data: Record<string, any>;
};

export const productUpdatedWorkflow = createWorkflow(
  "product-updated-workflow",
  function (input: WorkflowInput) {
    const { options, name, data } = input;
    productUpdatedWorkflowStep(input);
    return new WorkflowResponse(" Subscriber called");
  }
);
