import { defineRouteConfig } from "@medusajs/admin-sdk";
import { BellAlert } from "@medusajs/icons";
import { NotificationTemplateListTable } from "../../../components/notification-templates/notification-template-list/components/notification-template-list-table";

const CustomSettingPage = () => {
  return (
    <>
      <NotificationTemplateListTable />
    </>
  );
};

export const config = defineRouteConfig({
  icon: BellAlert,
  label: "Notification Template",
});

export default CustomSettingPage;
