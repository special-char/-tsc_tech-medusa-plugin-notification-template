import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { ModuleOptions } from "../../../../modules/notification-template/service";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
// import Handlebars from "handlebars";

type WorkflowInput = {
  options: ModuleOptions;
  name: string;
  data: Record<string, any>;
};

const productCreatedWorkflowStep = createStep(
  "product-created-workflow-step",
  async ({ options, name, data }: WorkflowInput, { container }) => {
    const notificationService = container.resolve("notification");
    const productService = container.resolve("product");
    const query = container.resolve(ContainerRegistrationKeys.QUERY);
    // productService.retrieveProduct()
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
        "brand.*",
      ],
    });
    const notiTemplate = await query.graph({
      fields: ["*", "event_id.*"],
      entity: "notification_template",
      filters: {
        event_id: {
          eventName: name,
        } as unknown as undefined,
      },
    });
    if (notiTemplate.data.length || true) {
      console.log("notiTemplate::::::", notiTemplate);
      // const bodyTemplate = Handlebars.compile(
      //   notiTemplate?.data?.[0]?.template || "Hello, {{title}}"
      // );

      // const emailBody = bodyTemplate(p.data[0]);
      // console.log("🚀 ~ emailBody:", emailBody);
    }
    console.log("product-created-workflow-step", { options, name });

    return new StepResponse();
  }
);

export default productCreatedWorkflowStep;
