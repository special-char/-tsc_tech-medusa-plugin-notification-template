import { type SubscriberConfig, type SubscriberArgs } from "@medusajs/medusa";
import { NOTIFICATION_TEMPLATE_MODULE } from "../modules/notification-template";
import NotificationTemplateModuleService from "../modules/notification-template/service";
import { NOTIFICATION_EVENTS } from "../utils/event";
import { subscriberWorkflow } from "../workflows/subscriber-workflow/subscriber-workflow/subscriber-workflow";

export default async function subscriberHandler({
  event: { data, name },
  container,
  pluginOptions,
}: SubscriberArgs) {
  const notificationTempalteService: NotificationTemplateModuleService =
    await container.resolve(NOTIFICATION_TEMPLATE_MODULE);
  const options = await notificationTempalteService.getOptions();
  console.log(`in subscriber:---- ${name}`);

  await subscriberWorkflow(container).run({
    input: {
      data: data as unknown as any,
      name,
      options,
    },
  });
}

export const config: SubscriberConfig = {
  event: NOTIFICATION_EVENTS?.reduce((p, c) => {
    if (c?.tags) {
      p.push(c.name as never);
    }
    return p;
  }, []),
};
