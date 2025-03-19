import { PencilSquare, Trash } from "@medusajs/icons";
import { NotificationTemplate } from "./notification-template-list-table";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Prompt } from "@medusajs/ui";

type NotificationTemplateRowActionsProps = {
  notificationTemplate: NotificationTemplate;
};

export const NotificationTemplateRowActions = ({
  notificationTemplate,
}: NotificationTemplateRowActionsProps) => {
  const navigation = useNavigate();
  const handleDelete = async () => {
    await fetch(`/admin/notification-template/${notificationTemplate?.id}`, {
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
