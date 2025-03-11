import { Input, Textarea, Checkbox } from "@medusajs/ui";
import TagInputComponent from "../TagInput";
import EventSelect from "../SelectEvent";
type InputElementType = React.ComponentType<any>;

const getInputElement = (type: string): InputElementType => {
  switch (type) {
    case "input":
      return Input;
    case "TagInputComponent":
      return TagInputComponent;
    case "EventSelect":
      return EventSelect;
    case "textarea":
      return Textarea;
    case "checkbox":
      return Checkbox;
    default:
      return Input;
  }
};

export default getInputElement;
