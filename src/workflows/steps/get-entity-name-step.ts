import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

type WorkflowInput = {
  name: string;
};
export const getEntityNameStep = createStep(
  "get-entity-name-step",
  function (input: WorkflowInput): StepResponse<{
    entityName: string;
  }> {
    const { name } = input;
    const entityName = name?.split(".")?.[0]?.replaceAll("-", "_");
    if (!entityName) {
      console.warn(`Invalid entity name derived from event: ${name}`);
      return new StepResponse();
    }

    return new StepResponse({ entityName });
  }
);
