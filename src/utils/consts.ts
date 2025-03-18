import { MedusaContainer } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export const setExtraData = (
  extraData: Record<string, any>,
  container: MedusaContainer
) => {
  const cacheModuleService = container.resolve(Modules.CACHE);
  cacheModuleService.set("extraData", extraData);
};
