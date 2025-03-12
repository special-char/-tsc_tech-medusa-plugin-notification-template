// import { Tag, TagInput } from "emblor";
// import { useEffect, useId, useMemo, useState } from "react";

// export default function TagInputComponent(props) {
//   const tagName = `${props.name}-tag-input-tags`;
//   const [exampleTags, setExampleTags] = useState<Tag[]>(
//     props?.value?.trim()
//       ? props?.value?.split(",").map((x, i) => ({ id: i + 1, text: x }))
//       : []
//   );
//   const [example, setExample] = props.exTags;
//   const tagList = useMemo(() => example[tagName] ?? [], [tagName, example]);

//   const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
//   useEffect(() => {
//     props?.value?.split(",")?.forEach((val) => {
//       setExample((prev) => ({
//         ...prev,
//         [tagName]: [
//           ...(prev[tagName] ? prev[tagName] : []),
//           { id: Date.now().toString(), text: val },
//         ],
//       }));
//     });
//     return () => {};
//   }, []);

//   console.log("val", props?.value);
//   // useEffect(() => {
//   //   props.onChange(tagList?.map((x) => x.text).toString());
//   //   return () => {};
//   // }, [tagList]);

//   return (
//     <div className="*:not-first:mt-2">
//       <TagInput
//         form={props.form}
//         id={tagName}
//         onTagRemove={(removeTag) => {
//           props.onChange(
//             example
//               ?.filter((x) => x.text != removeTag)
//               ?.map((x) => x.text)
//               ?.toString()
//           );
//           setExample((prev) => ({
//             ...prev,
//             [tagName]: example?.filter((x) => x.text != removeTag),
//           }));
//         }}
//         tags={tagList}
//         setTags={(newTags) => {
//           // setExample(newTags);
//           // setExample((prev) => ({
//           //   ...prev,
//           //   [tagName]: newTags,
//           // }));
//           const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//           if (!emailReg.test(newTags[newTags.length - 1].text)) {
// props.form.setError(props.name, {
//   message: "invalid email",
// });
//             return;
//           } else {
//             if (Array.isArray(newTags)) {
//               props.onChange(newTags?.map((x) => x.text).toString());
//             }
//           }
//         }}
//         placeholder={props.placeholder}
//         styleClasses={{
//           tagList: {
//             container: "gap-1",
//           },
//           input:
//             "caret-ui-fg-base bg-ui-bg-field hover:bg-ui-bg-field-hover placeholder-ui-fg-muted text-ui-fg-base transition-fg relative w-full appearance-none rounded-md outline-none focus-visible:shadow-borders-interactive-with-active disabled:text-ui-fg-disabled disabled:!bg-ui-bg-disabled disabled:placeholder-ui-fg-disabled disabled:cursor-not-allowed aria-[invalid=true]:!shadow-borders-error invalid:!shadow-borders-error [&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden txt-compact-small h-8 px-2 py-1.5",
//           tag: {
//             body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
//           },
//         }}
//         activeTagIndex={activeTagIndex}
//         setActiveTagIndex={setActiveTagIndex}
//         inlineTags={false}
//         inputFieldPosition="top"
//         name={tagName}
//       />
//     </div>
//   );
// }

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
