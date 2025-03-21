import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";

type WorkflowInput = {
  input: { name: string; data: Record<string, any> };
};
const validate = {
  "order.fulfillment_created": {
    order_id: "", // The ID of the order
    fulfillment_id: "", // The ID of the fulfillment
  },
  "order.fulfillment_canceled": {
    order_id: "", // The ID of the order
    fulfillment_id: "", // The ID of the fulfillment
  },
  "order.return_requested": {
    order_id: "", // The ID of the order
    return_id: "", // The ID of the return
  },
  "order.return_received": {
    order_id: "", // The ID of the order
    return_id: "", // The ID of the return
  },
  "order.claim_created": {
    order_id: "", // The ID of the order
    claim_id: "", // The ID of the claim
  },
  "order.exchange_created": {
    order_id: "", // The ID of the order
    exchange_id: "", // The ID of the exchange
  },
  "order.transfer_requested": {
    order_id: "", // The ID of the order
    exchange_id: "", // The ID of the exchange
  },
};

const validateDataByName = (name, data) => {
  const entity = name.split(".")[0];

  const sub_entity = name.split(".")[1];

  const entity_id = `${entity}_id`;

  const subEntity = sub_entity.includes("_")
    ? sub_entity.split("_")[0]
    : sub_entity;

  const subEntity_id = `${subEntity}_id`;

  const queryObject = {
    id: data[entity_id],
    // [subEntity]: {
    //   id: data[subEntity_id],
    // },
  };
  return queryObject;
};

export const validateInputData = createStep(
  "validate-input-data",
  function ({
    input,
  }: WorkflowInput): StepResponse<{ name: string; data: Record<string, any> }> {
    const { name, data } = input;
    let updatedData = { ...data };
    if (Object.keys(validate).includes(name)) {
      updatedData = validateDataByName(name, data);
    }
    return new StepResponse({ name, data: updatedData });
  }
);
