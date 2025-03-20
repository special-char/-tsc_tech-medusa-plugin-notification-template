import { FieldValues, SubmitHandler } from "react-hook-form";
import NotificationDetails from "../../../components/NotificationTemplateDetail";
import { useLocation, useNavigate } from "react-router-dom";
import { sdk } from "../../../utils/sdk";
import { NOTIFICATION_EVENTS } from "../../../utils/event";

const schema = {
  // event_name: {
  //   label: "Event",
  //   fieldType: "EventSelect",
  //   validation: { required: true },
  //   props: { eventList: NOTIFICATION_EVENTS, setTags },
  // },
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
  try {
    return await sdk.client.fetch(`/admin/notification-template/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const page = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await updateGiftTemplates({ id: state?.id, data });
      console.log({ response });
      navigate("/notification-template");
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };
  const events = NOTIFICATION_EVENTS;
  const tags = events?.find((x) => x?.name === state?.event_name)?.tags;
  return (
    <div>
      <NotificationDetails
        schema={schema}
        onSubmit={onSubmit}
        tags={tags}
        insertTag={() => {}}
      />
    </div>
  );
};

export default page;
