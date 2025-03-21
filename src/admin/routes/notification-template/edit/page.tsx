import { FieldValues, SubmitHandler } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@medusajs/ui";
import { MedusaError } from "@medusajs/framework/utils";
import { NOTIFICATION_EVENTS } from "../../../utils/event";
import NotificationDetails from "../../../components/NotificationTemplateDetail";
import { sdk } from "../../../utils/sdk";

const schema = {
  subject: {
    label: "Subject",
    fieldType: "Input",
    props: {
      placeholder: "Congratulations on your purchase",
    },
    validation: { required: "Subject is required" },
  },
  to: {
    label: "To",
    fieldType: "TagInputComponent",
    props: {
      placeholder: "example@gmail.com",
    },
    validation: { required: "To is required" },
  },
  cc: {
    label: "CC",
    fieldType: "TagInputComponent",
    props: {
      placeholder: "example@gmail.com",
    },
  },
  bcc: {
    label: "BCC",
    fieldType: "TagInputComponent",
    props: {
      placeholder: "example@gmail.com",
    },
  },
  template: {
    label: "Template (HTML format)",
    fieldType: "Textarea",
    props: {
      id: "contentTextarea",
      placeholder: "<html>...</html>",
      className: "min-h-52",
    },
    validation: { required: "Template is required" },
  },
};

const updateGiftTemplates = async ({ id, data }: { id: string; data: any }) => {
  return await sdk.client.fetch(`/admin/notification-template/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });
};

export type Tag = {
  id: string;
  company_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: null;
  has_account: boolean;
  metadata: null;
  created_by: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  groups: never[];
  addresses: never[];
};

const page = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await updateGiftTemplates({ id: state?.id, data });
      navigate("/notification-template");
    } catch (error) {
      toast.error((error as MedusaError)?.message || "Something went wrong");
    }
  };
  const events = NOTIFICATION_EVENTS;
  const tags = events?.find((x) => x?.name === state?.event_name)
    ?.tags as unknown as Tag[];
  return (
    <NotificationDetails schema={schema} onSubmit={onSubmit} tags={tags} />
  );
};

export default page;
