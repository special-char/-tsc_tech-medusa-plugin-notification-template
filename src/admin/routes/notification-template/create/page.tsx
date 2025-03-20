import { FieldValues, SubmitHandler } from "react-hook-form";
import NotificationDetails from "../../../components/NotificationTemplateDetail";
import { NOTIFICATION_EVENTS } from "../../../utils/event";
import { useState } from "react";
import { Event } from "../../../components/notification-template-row-actions";
import { sdk } from "../../../utils/sdk";
import { useNavigate } from "react-router-dom";

type Props = {};
const schema = ({ setTags }) => ({
  event_name: {
    label: "Event",
    fieldType: "EventSelect",
    props: { eventList: NOTIFICATION_EVENTS, setTags },
    validation: { required: "Event is required" },
  },
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
    // validation: { required: "To is required" },
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
});

const createGiftTemplates = async (data: any) => {
  try {
    return await sdk.client.fetch(`/admin/notification-template`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const CreateNotificationTemplate = () => {
  const [tags, setTags] = useState<Event["tags"]>({});
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await createGiftTemplates(data);
      console.log({ response });
      navigate("/notification-template");
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };
  return (
    <div>
      <NotificationDetails
        schema={schema({ setTags })}
        onSubmit={onSubmit}
        tags={tags}
      />
    </div>
  );
};
export default CreateNotificationTemplate;
