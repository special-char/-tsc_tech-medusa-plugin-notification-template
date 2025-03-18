import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { ProductDTO } from "@medusajs/framework/types";
export const GET = async (
  req: MedusaRequest<{ event: string }>,
  res: MedusaResponse
) => {
  const { event: event_name } = req.body;
  if (!event_name.trim()) {
    return res.send({ message: "event is required" }).status(400);
  }
  const entityName = event_name?.split(".")?.[0]?.replaceAll("-", "_");
  try {
    if (!entityName) {
      console.warn(`Invalid entity name derived from event: ${name}`);
      return;
    }
    const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);
const entityService = req.scope.resolve("product")
    const { data: entityData } = await query.graph({
      entity: entityName,
      filters: {},
      fields: ["*", "*.*"],
    });
    if (!(entityData.length > 0)) {
      return res
        .send({ message: `no ${entityName} data is available` })
        .status(400);
    }
    return res.send(entityData[0]);
  } catch (error) {
    return res.send({ message: `Invalid entity ${entityName}` }).status(400);
  }
};
