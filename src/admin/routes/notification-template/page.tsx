import { defineRouteConfig } from "@medusajs/admin-sdk";
import { BellAlert } from "@medusajs/icons";
import { DataTableComponent } from "../../components/DataTable";

const NotificationTemplateList = () => <DataTableComponent />;

export const config = defineRouteConfig({
  icon: BellAlert,
  label: "Notification Template",
});

export default NotificationTemplateList;
