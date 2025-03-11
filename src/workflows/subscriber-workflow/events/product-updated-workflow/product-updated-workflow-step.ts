import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ModuleOptions } from "../../../../modules/notification-template/service";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
// import Handlebars from "handlebars";
import sendEmailStep from "../../send-email-step";

type WorkflowInput = {
  options: ModuleOptions;
  name: string;
  data: Record<string, any>;
};

const productUpdatedWorkflowStep = createStep(
  "product-updated-workflow-step",
  async ({ options, name, data }: WorkflowInput, { container }) => {
    const notificationService = container.resolve("notification");
    const productService = container.resolve("product");
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    const p = await query.graph({
      entity: "product",
      filters: {
        id: data.id,
      },
      fields: [
        "*",
        "categories.*",
        "collection.*",
        "tags.*",
        "type.*",
        "variants.options.*",
        "variants.*",
      ],
    });
    console.log("product-updated-workflow-step::::::::: called", name, data);
    const notiTemplate = await query.graph({
      fields: ["*", "event_id.*"],
      entity: "notification_template",
      filters: {
        event_id: {
          eventName: name,
        } as unknown as undefined,
      },
    });
    let emailBody: string;
    if (notiTemplate.data.length || true) {
      console.log("notiTemplate::::::", notiTemplate);
      // const bodyTemplate = Handlebars.compile(
      //   notiTemplate?.data?.[0]?.template || "Hello, {{title}}"
      // );

      // emailBody = bodyTemplate(p.data[0]);
      // console.log("🚀 ~ emailBody:", emailBody);
    }
    console.log("product-updated-workflow-step", { options, name });
    // const response = await notificationService.createNotifications([
    //   {
    //     channel: "email",
    //     to: "harzh.patel@gmail.com",
    //     template: emailBody,
    //   },
    // ]);
    // console.log("notificationService.createNotifications", response);

    return new StepResponse({});
    // const { response } = sendEmailStep({ data: p.data[0], name, options });
    // return new StepResponse({ response });
  }
);

export default productUpdatedWorkflowStep;
