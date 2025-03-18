import { RouteFocusModal } from "../../common/modals";
import {
  Controller,
  FieldValues,
  Form,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button, Label, Text, Textarea } from "@medusajs/ui";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import NotificationTemplateForm from "../common/components/NotificationTempalteForm";
import TagList from "../common/components/TagList";
import useLastFocusedElement from "../../../hooks/use-last-focused-element";
import { NOTIFICATION_EVENTS } from "../../../utils/event";
import DynamicForm from "../common/components/DynamicForm";

const updateGiftTemplates = async ({ id, data }: { id: string; data: any }) => {
  try {
    const res = await fetch(`/admin/notification-template/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

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

export const NotificationEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const events = NOTIFICATION_EVENTS;
  const tags = events?.find((x) => x?.name === state?.event_name)?.tags;

  const formMethods = useForm<FieldValues>({
    defaultValues: useMemo(() => {
      return {
        template: state?.template || "",
        subject: state?.subject || "",
        to: state?.to || "",
        cc: state?.cc || "",
        bcc: state?.bcc || "",
      };
    }, []),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await updateGiftTemplates({ id: state?.id, data });
      navigate("/notification-template");
    } catch (error) {
      console.log("onSubmit error", error);
    }
  };
  const { insertTag } = useLastFocusedElement(formMethods);

  return (
    <RouteFocusModal>
      <RouteFocusModal.Header>{state.event_name}</RouteFocusModal.Header>
      <RouteFocusModal.Body className="relative flex w-full overflow-y-scroll px-8 py-16">
        <DynamicForm
          form={formMethods}
          isPending={formMethods.formState.isSubmitting}
          onSubmit={onSubmit}
          schema={schema}
        />
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
