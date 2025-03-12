import { RouteFocusModal } from "../../common/modals/route-focus-modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input, Text, Textarea } from "@medusajs/ui";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
// import { sdk } from "../../../lib/client";
import { Event } from "../notification-template-list/components/notification-template-list-table";
import TagList from "../common/components/TagList";
// import NotificationTemplateForm from "../common/components/NotificationTempalteForm";
import useLastFocusedElement from "../../../hooks/use-last-focused-element";
import { NOTIFICATION_EVENTS } from "../../../utils/event";
import EventSelect from "../common/components/SelectEvent";
import TagInputComponent from "../common/components/TagInput";
import DynamicForm from "../common/components/DynamicForm";

export type SchemaField = {
  label?: string;
  fieldType: string;
  props?: any;
  validation: Record<string, any>;
};

type Schema = Record<string, SchemaField>;

const schema = ({ setTags, exTags }) => ({
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
      exTags,
    },
    // validation: { required: "To is required" },
  },
  cc: {
    label: "CC",
    fieldType: "TagInputComponent",
    props: {
      placeholder: "example@gmail.com",
      exTags,
    },
  },
  bcc: {
    label: "BCC",
    fieldType: "TagInputComponent",
    props: {
      placeholder: "example@gmail.com",
      exTags,
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
const fetchEvents = async (setEvent: Dispatch<SetStateAction<Event[]>>) => {
  try {
    const eventData = await fetch(`/admin/notification-events`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await eventData.json();
    setEvent(response.data);
  } catch (error) {
    console.log(error);
  }
};
const createGiftTemplates = async (data: any) => {
  try {
    return await fetch(`/admin/notification-template`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

export const NotificationTemplateCreate = () => {
  const navigate = useNavigate();
  const events = NOTIFICATION_EVENTS;
  const [tags, setTags] = useState<Event["tags"]>({});
  const formMethods = useForm<FieldValues>({
    defaultValues: useMemo(() => {
      return {
        event_name: "",
        template: "",
        subject: "",
        to: "",
        cc: "",
        bcc: "",
      };
    }, []),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      console.log({ data });

      const response = await createGiftTemplates(data);
      const res = await response?.json();
      if (!response?.ok) {
        formMethods.setError("event_name", {
          message: res.message,
        });
        return;
      }
      navigate("/notification-template");
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };
  const { insertTag, exTags } = useLastFocusedElement(formMethods);

  return (
    <RouteFocusModal>
      <RouteFocusModal.Header />
      <RouteFocusModal.Body className="relative flex w-full overflow-y-scroll px-8 py-16">
        <DynamicForm
          form={formMethods}
          isPending={formMethods.formState.isSubmitting}
          onSubmit={onSubmit}
          schema={schema({ setTags, exTags })}
        />
        {/* <NotificationTemplateForm
          setTags={setTags}
          formFields={formFields}
          onSubmit={onSubmit}
          eventList={events}
          formMethods={formMethods}
        /> */}
        <div className="flex flex-1 flex-col p-4">
          <Text size="small">Available Tags</Text>
          <TagList
            tags={tags}
            onClick={(tag: string) => {
              insertTag(tag);
            }}
          />
        </div>
      </RouteFocusModal.Body>
    </RouteFocusModal>
  );
};
