import { type SubscriberConfig, type SubscriberArgs } from "@medusajs/medusa";
import { subscriberWorkflow } from "../workflows/subscriber-workflow";

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

const NOTIFICATION_EVENTS = [
  // { id: 1, name: "auth.password_reset" },
  { id: 2, name: "cart.created" },
  { id: 3, name: "cart.updated" },
  { id: 4, name: "cart.region_updated" },
  { id: 5, name: "customer.created" },
  { id: 6, name: "customer.updated" },
  { id: 7, name: "customer.deleted" },
  // { id: 8, name: "shipment.created" },
  // { id: 9, name: "delivery.created" },
  // { id: 10, name: "invite.accepted" },
  // { id: 11, name: "invite.created" },
  // { id: 12, name: "invite.deleted" },
  // { id: 13, name: "invite.resent" },
  { id: 14, name: "order.updated" },
  { id: 15, name: "order.placed" },
  { id: 16, name: "order.canceled" },
  { id: 17, name: "order.completed" },
  { id: 18, name: "order.archived" },
  { id: 19, name: "order.fulfillment_created" },
  { id: 20, name: "order.fulfillment_canceled" },
  { id: 21, name: "order.return_requested" },
  { id: 22, name: "order.return_received" },
  { id: 23, name: "order.claim_created" },
  { id: 24, name: "order.exchange_created" },
  { id: 25, name: "order.transfer_requested" },
  { id: 26, name: "product.created" },
  { id: 27, name: "product.updated" },
  { id: 28, name: "product.deleted" },
  { id: 29, name: "product-category.created" },
  { id: 30, name: "product-category.updated" },
  { id: 31, name: "product-category.deleted" },
  { id: 32, name: "product-collection.created" },
  { id: 33, name: "product-collection.updated" },
  { id: 34, name: "product-collection.deleted" },
  { id: 35, name: "product-option.created" },
  { id: 36, name: "product-option.updated" },
  { id: 37, name: "product-option.deleted" },
  { id: 38, name: "product-tag.created" },
  { id: 39, name: "product-tag.updated" },
  { id: 40, name: "product-tag.deleted" },
  { id: 41, name: "product-type.created" },
  { id: 42, name: "product-type.updated" },
  { id: 43, name: "product-type.deleted" },
  { id: 44, name: "product-variant.created" },
  { id: 45, name: "product-variant.updated" },
  { id: 46, name: "product-variant.deleted" },
  { id: 47, name: "region.created" },
  { id: 48, name: "region.updated" },
  { id: 49, name: "region.deleted" },
  { id: 50, name: "sales-channel.created" },
  { id: 51, name: "sales-channel.updated" },
  { id: 52, name: "sales-channel.deleted" },
  { id: 53, name: "user.created" },
  { id: 54, name: "user.updated" },
  { id: 55, name: "user.deleted" },
  { id: 56, name: "payment.captured" },
  { id: 57, name: "payment.refunded" },
];

export const config: SubscriberConfig = {
  event: NOTIFICATION_EVENTS?.map((x) => x.name),
};
