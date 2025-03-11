import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

type WorkflowInput = {
  options: {
    events?: Record<string, { subscriberId: string }>;
  };
  name: string;
};

const checkSubscriberStep = createStep(
  "check-subscriber",
  ({ options, name }: WorkflowInput) => {
    if (!options?.events) {
      console.log("No events object found in options");
    }
    const eventSubscriber = options?.events?.[name]?.subscriberId;
    return new StepResponse({ subscriberId: eventSubscriber });
  }
);

export default checkSubscriberStep;
