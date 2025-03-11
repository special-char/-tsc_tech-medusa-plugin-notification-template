import { Select } from "@medusajs/ui";
import { Dispatch, SetStateAction } from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Event } from "../../../notification-template-list/components/notification-template-list-table";

type Props = {
  field: ControllerRenderProps<FieldValues, string>;
  onChange: (...event: any[]) => void;
  value: string;
  setTags?: Dispatch<SetStateAction<Record<string, any> | undefined>>;
  eventList?: Event[];
};

const EventSelect = ({
  onChange,
  value,
  setTags,
  eventList,
  ...props
}: Props) => {
  return (
    <Select
      onValueChange={(v) => {
        onChange(v);
        if (setTags) {
          setTags(eventList?.find((item) => item?.name === v)?.tags);
        }
      }}
    >
      <Select.Trigger>
        <Select.Value placeholder={`Select an Event`} />
      </Select.Trigger>
      <Select.Content>
        {eventList?.map((item) => (
          <Select.Item key={item?.id} value={item?.name!}>
            {item?.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select>
  );
};

export default EventSelect;
