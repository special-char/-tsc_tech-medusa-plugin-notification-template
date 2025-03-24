# 📧 Medusa Notification Template Plugin

A Medusa plugin that provides notification template management functionality for your Medusa e-commerce store. This plugin allows you to create, edit, and manage notification templates for various events in your system.

## ✨ Features

- Create and manage notification templates
- Support for dynamic event-based templates
- Template variables support using Handlebars syntax
- Admin UI integration for template management
- Email notification support with customizable subject, to, cc, and bcc fields

## 📋 Unavailable Events

The following events are not available in the current version of the plugin:

- `auth.password_reset`
- `shipment.created`
- `delivery.created`
- `invite.accepted`
- `invite.created`
- `invite.deleted`
- `invite.resent`


## 📦 Installation

```bash
npm install @tsc_tech/medusa-plugin-notification-template

# or using yarn
yarn add @tsc_tech/medusa-plugin-notification-template

# Run migration
npx medusa db:migrate
```

## 📋 Requirements

- Medusa server > 2.5.0
- Node.js >= 20

## ⚙️ Configuration

Add the plugin to your `medusa-config.js`:

```js
const plugins = [
  // ... other plugins
  {
    resolve: "@tsc_tech/medusa-plugin-notification-template",
    options: {
      // plugin options if any
    }
  }
]
```

## 🚀 Usage

### 🖥️ Admin UI Walkthrough

The plugin interface will be displayed under the "Extensions" section. The "Notification Template" feature includes the following routes:

1. **Template List View** (`/notification-template`)
   - View all notification templates
   - Create new templates
   - Edit existing templates
   - Delete templates

2. **Create Template View** (`/notification-template/create`)
   - Create new notification templates with:
     - Event name
     - Template content
     - Subject
     - To, CC, and BCC fields

3. **Edit Template View** (`/notification-template/edit`)
   - Modify existing templates
   - Preview template with sample data

### 🔄 Using in Workflows

To use the notification template in your workflow hook, import the `subscriberWorkflow` functions from the `@tsc_tech/medusa-plugin-notification-template/workflows/subscriber-workflow`:

```typescript
import { subscriberWorkflow } from "@tsc_tech/medusa-plugin-notification-template/workflows/subscriber-workflow";
subscriberWorkflow.hooks.subscriberHook(({ name, data }, { container }) => {
  const notificationService =
    container.resolve("notification-template");
  const value = {
    otp: "1234",
  };
  notificationService.setExtraData(value, container);
});
```

#### 🎯 Purpose of the Subscriber Hook

The `subscriberHook` in the `subscriberWorkflow` allows plugins to add extra data to notification templates. This extra data can be customized to suit the plugin's needs, enabling dynamic and flexible display of information in the templates. By using the `setExtraData` function, you can pass additional data to the workflow, which can then be utilized in the templates to create personalized and relevant notifications.

### 📝 Template Variables

Templates support Handlebars syntax for dynamic content. Available variables depend on the event type. For example:

```handlebars
Hello {{customer.first_name}},

Your order #{{order.display_id}} has been confirmed.

Thank you for shopping with us!
```

### 📧 Notification Service Implementation

#### Send Method Example
Here's an example of the notification service's `send` method:

```typescript
async send(
    notification: ProviderSendNotificationDTO
  ): Promise<ProviderSendNotificationResultsDTO> {
    console.log({ notification });

   // your service code as it is
  }
```

#### Notification Object Structure

The notification object passed to the send method has the following structure:
```json
{
  id,                // Notification ID
  channel,          // Communication channel (e.g., 'email')
  to,               // Primary recipient
  data: {
    // Contains all email-specific data and template information
    id,
    template,       // Raw template with handlebars syntax
    subject,        // Email subject
    event_name,     // Type of event (e.g., 'product.updated')
    to: [],              // Array of recipients
    cc: [],              // Array of CC recipients
    bcc: [],             // Array of BCC recipients
    created_at,
    updated_at,
    deleted_at,
    emailBody      // Processed template content
  },
  template,         // Processed template content
  content: {
    // Contains dynamic data used in template rendering
    entityDetails: {}    // Object containing entity-specific data
  },
  provider_id      // ID of the notification provider (e.g., 'smtp')
}
```

#### Important Structure Notes:

1. The `data` object contains all email-related configurations including:
   - Template configuration (`template`, `subject`)
   - Recipient information (`to`, `cc`, `bcc`)
   - Event information (`event_name`)
   - Email content (`emailBody`)

2. The `content` object contains:
   - `entityDetails`: Dynamic data that will be used to populate the template variables. For example, if it's a product update notification, this would contain the product details.

This structure allows for separation between email configuration (`data`) and the dynamic content (`content.entityDetails`) that will be used in the template.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

MIT License