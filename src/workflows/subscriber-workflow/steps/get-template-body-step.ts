import { Modules } from "@medusajs/framework/utils";
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import Handlebars from "handlebars";

type WorkflowInput = {
  entityData: any[];
  data: Record<string, any>;
  notificationTemplate: {
    id: string;
    template: string;
    subject: string;
    event_name: string;
    to: string;
    cc: string;
    bcc: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  };
};
export const getTemplateBodyStep = createStep(
  "get-template-body-step",
  async (
    input: WorkflowInput,
    { container }
  ): Promise<
    StepResponse<{
      entityDetails: any;
      templateBody: {
        emailBody: string;
        to: string[];
        cc: string[];
        bcc: string[];
        subject: string;
      };
    }>
  > => {
    const cacheModuleService = container.resolve(Modules.CACHE);
    const extraData: Record<string, any> | null = await cacheModuleService.get(
      "extraData"
    );
    const { entityData, notificationTemplate, data } = input;
    if (!entityData.length) {
      console.warn(`No entity data found for ID: ${data.id}`);
      return new StepResponse();
    }

    const entityDetails = {
      ...(entityData[0] && { ...entityData[0] }),
      ...(extraData && { ...extraData }),
    };

    const compileAndParseEmails = (template?: string): string[] => {
      if (!template) return [];
      return Handlebars.compile(template)(entityDetails)
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email);
    };

    const templateBody = {
      emailBody: Handlebars.compile(notificationTemplate.template)(
        entityDetails
      ),
      to: compileAndParseEmails(notificationTemplate.to),
      cc: compileAndParseEmails(notificationTemplate.cc),
      bcc: compileAndParseEmails(notificationTemplate.bcc),
      subject: Handlebars.compile(notificationTemplate.subject)(entityDetails),
    };
    return new StepResponse({ templateBody, entityDetails });
  }
);
