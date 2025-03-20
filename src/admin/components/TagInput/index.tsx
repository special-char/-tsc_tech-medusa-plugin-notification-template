import { useState, useRef } from "react";
import { Input } from "@medusajs/ui";

export default function CustomTagInput(props) {
  const [tags, setTags] = useState(
    props?.value ? props?.value?.split(",") : []
  );
  const inputRef = useRef(null);

  const isValidTag = (tag) => {
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const placeholderReg = /^\{\{[a-zA-Z0-9_]+\}\}$/;
    return emailReg.test(tag) || placeholderReg.test(tag);
  };

  const addTag = (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      event.preventDefault();
      const newTag = event.target.value.trim();

      if (!isValidTag(newTag)) {
        props.form.setError(props.name, {
          message: "Invalid email address. Please enter a valid email.",
        });
        // alert("Invalid email address. Please enter a valid email.");
        // return;
      }

      if (!tags.includes(newTag)) {
        const newTags = [...tags, newTag];
        setTags(newTags);
        props.onChange(newTags.join(","));
      }

      event.target.value = "";
    }
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    props.onChange(newTags.join(","));
    props.form.setError(props.name, {
      message: "",
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md w-full">
      <Input
        id={`${props.name}-tag-input-tags`}
        ref={inputRef}
        type="text"
        placeholder={props.placeholder}
        className="flex-1 min-w-20 border-none outline-none focus:ring-0"
        onKeyDown={addTag}
      />
      <div className="flex gap-1 flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              className="text-red-500 hover:text-red-700"
              onClick={() => removeTag(index)}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
