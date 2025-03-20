import { memo } from "react";
import { Control, FieldValues, useController } from "react-hook-form";

const ErrorMessage = ({
  name,
  control,
  rules,
}: {
  name: string;
  control: Control<FieldValues>;
  rules: any;
}) => {
  const {
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <>
      {error && (
        <p
          style={{
            color: "red",
          }}
          className="text-xs mt-1"
        >
          {error?.message || rules?.message}
        </p>
      )}
    </>
  );
};

export default memo(ErrorMessage);
