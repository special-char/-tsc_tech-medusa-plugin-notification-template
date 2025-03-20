import { Input, Textarea, Checkbox } from "@medusajs/ui";
import EventSelect from "../SelectEvent";
import CustomTagInput from "../TagInput";
type InputElementType = React.ComponentType<any>;

const getInputElement = (type: string): InputElementType => {
  switch (type) {
    case "input":
      return Input;
    case "TagInputComponent":
      return CustomTagInput;
    case "EventSelect":
      return EventSelect;
    case "Textarea":
      return Textarea;
    case "checkbox":
      return Checkbox;
    default:
      return Input;
  }
};

export default getInputElement;
