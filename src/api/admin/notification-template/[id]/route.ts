import { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { MedusaError } from "@medusajs/framework/utils";
import NotificationTemplateModuleService from "../../../../modules/notification-template/service";
import { NOTIFICATION_TEMPLATE_MODULE } from "../../../../modules/notification-template";
type PostAdminUpdateNotificationTemplateType = {
    template: string;
    subject: string;
};
export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    const { id } = req.params;

    const query = req.scope.resolve("query")
    const notificationTemplate = await query.graph({
        entity: "notification_template",
        fields: ["*", "event_id.*",],
        filters: {
            id
        }
    })
    if (notificationTemplate.data[0]) {
        return res.send(notificationTemplate.data[0]);
    }

    throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        "Template not found."
    );

};

export const PUT = async (
    req: MedusaRequest<PostAdminUpdateNotificationTemplateType>,
    res: MedusaResponse
) => {
    const { id } = req.params;

    const notificationTemplateModuleService: NotificationTemplateModuleService = req.scope.resolve(NOTIFICATION_TEMPLATE_MODULE);

    const notificationTemplate = await notificationTemplateModuleService.updateNotificationTemplates({ id, ...req.body });
    res.send({ notificationTemplate });
};


export const DELETE = async (
    req: MedusaRequest<PostAdminUpdateNotificationTemplateType>,
    res: MedusaResponse
) => {
    const { id } = req.params;
    const query = req.scope.resolve("query")
    const notificationTemplateModuleService: NotificationTemplateModuleService = req.scope.resolve(NOTIFICATION_TEMPLATE_MODULE);
    const notificationTemplate = await query.graph({
        entity: "notification_template",
        fields: ["*", "event_id.*",],
        filters: {
            id
        }
    })
    if (notificationTemplate.data[0]) {
        await notificationTemplateModuleService.deleteNotificationTemplates(id);
        res.send();
    }

    throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        "Template not found."
    );
};