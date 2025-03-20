import { PencilSquare, Trash } from "@medusajs/icons";
import { useNavigate } from "react-router-dom";
import { IconButton, Prompt } from "@medusajs/ui";
import { sdk } from "../utils/sdk";

type NotificationTemplateRowActionsProps = {
  notificationTemplate: NotificationTemplate;
};
export type Event = {
  id?: string;
  name?: string;
  tags?: Record<string, any>;
};

// Define a type for the brand data
export interface NotificationTemplate {
  id?: string;

  template?: string;

  created_at?: string;

  updated_at?: string;

  deleted_at?: string | null;

  event_name: string;
}

export const NotificationTemplateRowActions = ({
  notificationTemplate,
}: NotificationTemplateRowActionsProps) => {
  const navigation = useNavigate();
  const handleDelete = async () => {
    await sdk.client.fetch(`/admin/notification-template`, {
      method: "DELETE",
    });

    navigation("/notification-template");
    navigation(0);
  };
  return (
    <div className="gap-2 flex">
      <IconButton
        onClick={() =>
          navigation(`/notification-template/${notificationTemplate.id}`, {
            state: notificationTemplate,
          })
        }
      >
        <PencilSquare />
      </IconButton>

      <Prompt>
        <Prompt.Trigger asChild>
          <IconButton>
            <Trash />
          </IconButton>
        </Prompt.Trigger>
        <Prompt.Content>
          <Prompt.Header>
            <Prompt.Title>
              Delete {notificationTemplate.event_name}
            </Prompt.Title>
            <Prompt.Description>
              Are you sure? This cannot be undone.
            </Prompt.Description>
          </Prompt.Header>
          <Prompt.Footer>
            <Prompt.Cancel>Cancel</Prompt.Cancel>
            <Prompt.Action onClick={handleDelete}>Delete</Prompt.Action>
          </Prompt.Footer>
        </Prompt.Content>
      </Prompt>
    </div>
  );
};
