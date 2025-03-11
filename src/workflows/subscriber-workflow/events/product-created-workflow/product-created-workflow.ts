import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { emitEventStep } from "@medusajs/medusa/core-flows";
import { ModuleOptions } from "../../../../modules/notification-template/service";
import productCreatedWorkflowStep from "./product-created-workflow-step";

type WorkflowInput = {
  options: ModuleOptions;
  name: string;
  data: Record<string, any>;
};

export const productCreatedWorkflow = createWorkflow(
  "product-created-workflow",
  function (input: WorkflowInput) {
    const { options, name, data } = input;
    productCreatedWorkflowStep(input);
    return new WorkflowResponse(" Subscriber called");
  }
);
