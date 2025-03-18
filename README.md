# Medusa Notification Template Plugin

A Medusa plugin that provides notification template management functionality for your Medusa e-commerce store. This plugin allows you to create, edit, and manage notification templates for different events in your system.

## Features

- Create and manage notification templates
- Support for dynamic event-based templates
- Template variables support using Handlebars syntax
- Admin UI integration for template management
- Email notification support with customizable subject, to, cc, and bcc fields

## Installation

```bash
npm install medusa-plugin-notification-template

# or using yarn
yarn add medusa-plugin-notification-template
```

## Requirements

- Medusa server >= 2.4.0
- Node.js >= 20

## Configuration

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

## Usage

### Admin UI Integration

The plugin adds a new section in your Medusa admin panel under "Notification Template" with the following features:

1. Template List View (`/notification-template`)
   - View all notification templates
   - Create new templates
   - Edit existing templates
   - Delete templates

2. Create Template View (`/notification-template/create`)
   - Create new notification templates with:
     - Event name
     - Template content
     - Subject
     - To, CC, and BCC fields

3. Edit Template View (`/notification-template/[id]`)
   - Modify existing templates
   - Preview template with sample data

### Using in Workflows

To use the notification template in your workflow hook, import the `setExtraData` and `subscriberWorkflow` functions from the `medusa-plugin-notification-template/workflows`:

```typescript
import {
  subscriberWorkflow,
  setExtraData,
} from "medusa-plugin-notification-template/workflows";

subscriberWorkflow?.hooks?.subscriberHook(
  async ({ data, name }, { container }) => {
    // example json object
    const value = {
      key: "value",
    };
    setExtraData(value, container);
  }
);
```

#### Purpose of the Subscriber Hook

The `subscriberHook` in the `subscriberWorkflow` allows plugins to add extra data to notification templates. This extra data can be customized to suit the plugin's needs, enabling dynamic and flexible display of information in the templates. By using the `setExtraData` function, you can pass additional data to the workflow, which can then be utilized in the templates to create personalized and relevant notifications.

### Template Variables

Templates support Handlebars syntax for dynamic content. Available variables depend on the event type. For example:

```handlebars
Hello {{customer.first_name}},

Your order #{{order.display_id}} has been confirmed.

Thank you for shopping with us!
```

## Development

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```

3. Build the plugin:
```bash
yarn build
```

4. Test the plugin:
```bash
yarn test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>
<h1 align="center">
  Medusa Plugin Starter
</h1>

<h4 align="center">
  <a href="https://docs.medusajs.com">Documentation</a> |
  <a href="https://www.medusajs.com">Website</a>
</h4>

<p align="center">
  Building blocks for digital commerce
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
    <a href="https://www.producthunt.com/posts/medusa"><img src="https://img.shields.io/badge/Product%20Hunt-%231%20Product%20of%20the%20Day-%23DA552E" alt="Product Hunt"></a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

## Compatibility

This starter is compatible with versions >= 2.4.0 of `@medusajs/medusa`. 

## Getting Started

Visit the [Quickstart Guide](https://docs.medusajs.com/learn/installation) to set up a server.

Visit the [Plugins documentation](https://docs.medusajs.com/learn/fundamentals/plugins) to learn more about plugins and how to create them.

Visit the [Docs](https://docs.medusajs.com/learn/installation#get-started) to learn more about our system requirements.

## What is Medusa

Medusa is a set of commerce modules and tools that allow you to build rich, reliable, and performant commerce applications without reinventing core commerce logic. The modules can be customized and used to build advanced ecommerce stores, marketplaces, or any product that needs foundational commerce primitives. All modules are open-source and freely available on npm.

Learn more about [Medusa's architecture](https://docs.medusajs.com/learn/introduction/architecture) and [commerce modules](https://docs.medusajs.com/learn/fundamentals/modules/commerce-modules) in the Docs.

## Community & Contributions

The community and core team are available in [GitHub Discussions](https://github.com/medusajs/medusa/discussions), where you can ask for support, discuss roadmap, and share ideas.

Join our [Discord server](https://discord.com/invite/medusajs) to meet other community members.

## Other channels

- [GitHub Issues](https://github.com/medusajs/medusa/issues)
- [Twitter](https://twitter.com/medusajs)
- [LinkedIn](https://www.linkedin.com/company/medusajs)
- [Medusa Blog](https://medusajs.com/blog/)
