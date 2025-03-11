import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

type WorkflowInput = {
  options: {
    events?: Record<string, { subscriberId: string }>;
  };
  name: string;
  data: Record<string, any>;
};

const switchEventStep = createStep(
  "switch-event-step",
  async ({ options, name, data }: WorkflowInput, { container }) => {
    console.log(
      { options, name, data },
      `switch-event-step called ${name} successfully`
    );
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const { data: entityData } = await query.graph({
      entity: name?.split(".")?.[0]?.replace("-", "_")! as string,
      filters: {
        id: data.id,
      },
      fields: ["*", "*.*"],
    });
    console.log("entityData switch-event-step", JSON.stringify(entityData));
    return new StepResponse("subscriber called successfully");
  }
);

export default switchEventStep;
