import { Tag, TagInput } from "emblor";
import { useId, useState } from "react";

export default function TagInputComponent(props) {
  const id = useId();
  const [exampleTags, setExampleTags] = useState<Tag[]>(
    props?.value?.trim()
      ? props?.value?.split(",").map((x, i) => ({ id: i + 1, text: x }))
      : []
  );
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  console.log(props.name, exampleTags);

  return (
    <div className="*:not-first:mt-2">
      <TagInput
        id={id}
        name={props.name}
        onTagRemove={(removeTag) =>
          props.onChange(
            exampleTags
              .filter((x) => x.text != removeTag)
              .map((x) => x.text)
              .toString()
          )
        }
        tags={exampleTags}
        setTags={(newTags) => {
          setExampleTags(newTags);
          console.log("new tag", newTags);
          const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailReg.test(newTags[newTags.length - 1].text)) {
            props.form.setError(props.name, {
              message: "invalid email",
            });
            return;
          } else {
            if (Array.isArray(newTags)) {
              props.onChange(newTags?.map((x) => x.text).toString());
            }
          }
        }}
        placeholder={props.placeholder}
        styleClasses={{
          tagList: {
            container: "gap-1",
          },
          input:
            "caret-ui-fg-base bg-ui-bg-field hover:bg-ui-bg-field-hover placeholder-ui-fg-muted text-ui-fg-base transition-fg relative w-full appearance-none rounded-md outline-none focus-visible:shadow-borders-interactive-with-active disabled:text-ui-fg-disabled disabled:!bg-ui-bg-disabled disabled:placeholder-ui-fg-disabled disabled:cursor-not-allowed aria-[invalid=true]:!shadow-borders-error invalid:!shadow-borders-error [&::--webkit-search-cancel-button]:hidden [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden txt-compact-small h-8 px-2 py-1.5",
          tag: {
            body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="top"
        {...props}
      />
    </div>
  );
}
