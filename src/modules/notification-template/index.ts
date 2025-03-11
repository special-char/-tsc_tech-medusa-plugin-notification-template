import { Module } from "@medusajs/framework/utils"
import NotificationTemplateModuleService from "./service"

export const NOTIFICATION_TEMPLATE_MODULE = "notification-template"

export default Module(NOTIFICATION_TEMPLATE_MODULE, {
    service: NotificationTemplateModuleService,
})