import { useLocation } from "react-router-dom";
import DynamicForm, { SchemaField } from "../DynamicForm";
import TagList from "../TagList";
import { Text } from "@medusajs/ui";
import { FieldValues, useForm } from "react-hook-form";
import { useMemo } from "react";
import useLastFocusedElement from "../../hooks/use-last-focused-element";
import { Tag } from "../../routes/notification-template/[id]/page";
import { RouteFocusModal } from "../common/modals";

type Props = {
  id?: string;
  schema: Record<string, SchemaField>;
  onSubmit: (data: FieldValues) => void;
  tags: Tag[];
};

const NotificationDetails = (props: Props) => {
  const { state } = useLocation();
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
  const { insertTag } = useLastFocusedElement(formMethods);

  return (
    <RouteFocusModal>
      <RouteFocusModal.Header>
        {state ? state?.event_name : "Create Notification Template"}
      </RouteFocusModal.Header>

      <RouteFocusModal.Body className="relative flex w-full overflow-y-scroll px-8 py-16">
        <DynamicForm
          form={formMethods}
          isPending={formMethods.formState.isSubmitting}
          onSubmit={props.onSubmit}
          schema={props.schema}
        />
        <div className="flex flex-1 flex-col p-4">
          <Text size="small">Available Tags</Text>
          <TagList
            tags={props.tags}
            onClick={(tag: string) => {
              insertTag(tag);
            }}
          />
        </div>
      </RouteFocusModal.Body>
    </RouteFocusModal>
  );
};

export default NotificationDetails;
