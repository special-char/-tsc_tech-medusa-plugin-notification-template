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
npm install medusa-plugin-notification-template

# or using yarn
yarn add medusa-plugin-notification-template
```

## 📋 Requirements

- Medusa server >= 2.4.0
- Node.js >= 20

## ⚙️ Configuration

Add the plugin to your `medusa-config.js`:

```js
const plugins = [
  // ... other plugins
  {
    resolve: "medusa-plugin-notification-template",
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

3. **Edit Template View** (`/notification-template/[id]`)
   - Modify existing templates
   - Preview template with sample data

### 🔄 Using in Workflows

To use the notification template in your workflow hook, import the `setExtraData` and `subscriberWorkflow` functions from the `medusa-plugin-notification-template/workflows`:

```typescript
import {
  subscriberWorkflow,
  setExtraData,
} from "medusa-plugin-notification-template/workflows";

subscriberWorkflow?.hooks?.subscriberHook(
  async ({ data, name }, { container }) => {
    // example JSON object
    const value = {
      key: "value",
    };
    setExtraData(value, container);
  }
);
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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

MIT License