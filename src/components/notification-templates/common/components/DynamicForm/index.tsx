import { FieldValues, Form, UseFormReturn } from "react-hook-form";
import { memo } from "react";
import { Button } from "@medusajs/ui";
import GenerateFormFields from "./GenerateFormFields";

export type SchemaField = {
  label?: string;
  fieldType: string;
  props?: any;
  validation?: Record<string, any>;
};

type Props = {
  form: UseFormReturn<FieldValues, any, undefined>;
  onSubmit: (data: FieldValues) => void;
  onReset?: () => void;
  schema: Record<string, SchemaField>;
  isPending: boolean;
};

const DynamicForm = ({ form, onSubmit, onReset, schema, isPending }: Props) => {
  return (
    <Form
      control={form.control}
      onSubmit={form.handleSubmit(onSubmit) as any}
      className="flex w-full flex-col gap-y-3"
      style={{
        flex: 2,
      }}
    >
      <GenerateFormFields form={form} schema={schema} />
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
        {onReset && (
          <Button
            type="button"
            variant="secondary"
            disabled={isPending}
            onClick={onReset}
          >
            Reset
          </Button>
        )}
      </div>
    </Form>
  );
};

export default memo(DynamicForm);
