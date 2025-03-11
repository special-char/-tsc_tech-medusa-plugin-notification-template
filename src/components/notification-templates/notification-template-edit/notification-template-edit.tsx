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
import { Event } from "../notification-template-list/components/notification-template-list-table";
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

const formFields = [
  // {
  //   name: "event_id",
  //   label: "Event",
  //   type: "select",
  //   required: true,
  // },
  {
    name: "subject",
    label: "Subject",
    type: "Input",
    required: true,
    props: {
      placeholder: "Congratulations on your purchase",
    },
  },
  {
    name: "template",
    label: "Template (HTML format)",
    type: "Textarea",
    required: true,
    props: {
      id: "contentTextarea",
      placeholder: "<html>...</html>",
      className: "min-h-52",
    },
  },
];

export const NotificationEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const events = NOTIFICATION_EVENTS;
  const tags = events.find((x) => x.name === state.event_name)?.tags;

  const formMethods = useForm<FieldValues>({
    defaultValues: useMemo(() => {
      return {
        template: state.template,
        subject: state.subject,
        to: state.to,
        cc: state.cc,
        bcc: state.bcc,
      };
    }, [state.subject, state.template]),
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
  const lastFocusedRef = useLastFocusedElement();

  const insertTag = (
    tag: string,
    lastFocusedRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputElement = lastFocusedRef.current;
    if (!inputElement) {
      console.warn("No input or textarea was previously focused.");
      return;
    }

    const {
      selectionStart: start = 0,
      selectionEnd: end = 0,
      value,
    } = inputElement;

    // Insert the tag at the cursor position
    inputElement.value = `${value.slice(0, start!)}{{${tag}}}${value.slice(
      end!
    )}`;
    console.log("inputElement.name", inputElement.name);
    formMethods.setValue(inputElement.name, inputElement.value);
    // Restore cursor position and focus
    setTimeout(() => {
      inputElement.setSelectionRange(
        start! + `{{${tag}}}`.length,
        start! + `{{${tag}}}`.length
      );
      inputElement.focus();
    }, 0);
  };

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
              insertTag(tag, lastFocusedRef);
            }}
          />
        </div>
      </RouteFocusModal.Body>
    </RouteFocusModal>
  );
};
