import { type SubscriberConfig, type SubscriberArgs } from "@medusajs/medusa";
import { NOTIFICATION_EVENTS } from "../utils/event";
import { subscriberWorkflow } from "../workflows/subscriber-workflow/subscriber-workflow/subscriber-workflow";

export default async function subscriberHandler({
  event: { data, name },
  container,
}: SubscriberArgs) {
  await subscriberWorkflow(container).run({
    input: {
      data: data as unknown as any,
      name,
    },
  });
}

export const config: SubscriberConfig = {
  event: NOTIFICATION_EVENTS?.map((x) => x.name),
};
