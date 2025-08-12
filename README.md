# MCP its-just-ui Server

[![npm version](https://img.shields.io/npm/v/its-just-mcp?color=blue)](https://www.npmjs.com/package/its-just-mcp)
[![npm downloads](https://img.shields.io/npm/dm/its-just-mcp.svg)](https://www.npmjs.com/package/its-just-mcp)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D18-339933.svg?logo=node.js&logoColor=white)](package.json)
[![typescript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](tsconfig.json)
[![MCP SDK](https://img.shields.io/badge/MCP%20SDK-1.x-7A7AFF)](https://modelcontextprotocol.io)

A Model Context Protocol (MCP) server for the its-just-ui React component library. This server provides AI-powered tools to generate, customize, and document its-just-ui components.

### Table of Contents
- **Overview**
- **Quick Start**
- **Use in Cursor**
- **Use in Claude Desktop**
- **Available Tools**
- **Usage Examples**
- **Development**
- **Troubleshooting**
- **Contributing**
- **License**

## Quick Start

```bash
# 1) Clone and install
git clone https://github.com/yourusername/mcp-its-just-ui-server.git
cd mcp-its-just-ui-server
npm install

# 2) Build
npm run build

# 3) (Optional) Run in dev mode
npm run dev
```

## Use in Cursor

Cursor supports MCP servers via stdio and SSE. This server uses stdio, so no code changes are needed.

Project-level configuration (recommended): create `.cursor/mcp.json` in your project root.

```json
{
  "mcpServers": {
    "its-just-ui": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-its-just-ui-server/dist/index.js"],
      "env": {}
    }
  }
}
```

Global configuration: create `~/.cursor/mcp.json` to make the server available across all workspaces.

If you publish this package, you can configure Cursor with `npx`:

```json
{
  "mcpServers": {
    "its-just-ui": {
      "command": "npx",
      "args": ["-y", "its-just-mcp"]
    }
  }
}
```

Resources:
- Cursor docs on MCP: https://cursor-docs.apidog.io/model-context-protocol-896302m0
- Official MCP: https://modelcontextprotocol.io

## Features

### 🎨 Component Generation
- Generate any its-just-ui component with custom props
- Create component compositions
- Support for all 36+ components in the library

### 🎭 Theme Management
- Configure light/dark themes
- Customize colors, typography, and spacing
- Generate theme configurations
- Create responsive themes

### 🛠️ Utility Tools
- Generate Tailwind CSS utility classes
- Create responsive layouts
- Build form structures with validation
- Generate common UI patterns

### 📚 Documentation Tools
- Get component documentation and examples
- Check accessibility features
- View prop descriptions and TypeScript types
- Access usage guidelines

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mcp-its-just-ui-server.git
cd mcp-its-just-ui-server

# Install dependencies
npm install

# Build the server
npm run build
```

### Run directly (CLI)

```bash
# After build
npm start

# Or run the dev server
npm run dev

# Or execute the built CLI directly
node dist/index.js
```

## Configuration

### For Claude Desktop

Add the following to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "its-just-ui": {
      "command": "node",
      "args": ["/path/to/mcp-its-just-ui-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### For Other MCP Clients

```bash
# Run the server directly
npm start

# Or in development mode
npm run dev
```

## Available Tools

Below is a quick reference. See sections further down for input shapes and examples.

- `generate_component`: Generate JSX for an its-just-ui component
- `list_components`: List available components by category
- `compose_components`: Compose multiple components with a layout wrapper
- `configure_theme`: Create a `ThemeProvider` snippet with custom theme options
- `generate_tailwind_classes`: Generate Tailwind utility class maps
- `create_responsive_layout`: Return common responsive layout snippets
- `create_form`: Build a React form using its-just-ui components (+optional validation)
- `get_component_docs`: Markdown documentation for usage/props/examples
- `check_accessibility`: Accessibility summary and checklist

### Component Generation

#### `generate_component`
Generate an its-just-ui component with specified props and styling.

```typescript
{
  component: "Button",
  props: {
    variant: "primary",
    size: "lg"
  },
  children: "Click Me",
  className: "mt-4"
}
```

#### `list_components`
List available components by category.

```typescript
{
  category: "form" // Options: all, core, navigation, form, data-display, feedback, layout
}
```

#### `compose_components`
Create a composition of multiple components.

```typescript
{
  components: [
    { type: "Card", props: { variant: "elevated" }, children: "Card 1" },
    { type: "Button", props: { variant: "primary" }, children: "Action" }
  ],
  layout: "vertical" // Options: vertical, horizontal, grid
}
```

### Theme Management

#### `configure_theme`
Configure theme settings including colors and typography.

```typescript
{
  mode: "dark",
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b"
  },
  borderRadius: "0.5rem",
  fontFamily: "Inter, sans-serif"
}
```

### Utility Tools

#### `generate_tailwind_classes`
Generate Tailwind utility classes for specific use cases.

```typescript
{
  type: "spacing", // Options: spacing, colors, typography, layout, effects
  values: {
    padding: "p-6",
    margin: "m-4"
  }
}
```

#### `create_responsive_layout`
Create responsive layouts using Tailwind CSS.

```typescript
{
  type: "grid", // Options: grid, flexbox, container, sidebar, hero, card-grid
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px"
  }
}
```

#### `create_form`
Generate form structures using its-just-ui components.

```typescript
{
  fields: [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "Enter your email"
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true
    }
  ],
  layout: "single-column", // Options: single-column, two-column, inline
  includeValidation: true
}
```

### Documentation Tools

#### `get_component_docs`
Get documentation for a specific component.

```typescript
{
  component: "Button",
  section: "props" // Options: usage, props, examples, accessibility
}
```

#### `check_accessibility`
Get accessibility features and ARIA attributes for a component.

```typescript
{
  component: "Dialog"
}
```

## Usage Examples

### Generate a Button Component
```javascript
// Request
{
  "tool": "generate_component",
  "arguments": {
    "component": "Button",
    "props": {
      "variant": "primary",
      "size": "lg",
      "loading": false
    },
    "children": "Get Started"
  }
}

// Response
<Button variant="primary" size="lg" loading={false}>
  Get Started
</Button>
```

### Create a Login Form
```javascript
// Request
{
  "tool": "create_form",
  "arguments": {
    "fields": [
      {
        "name": "email",
        "type": "email",
        "label": "Email",
        "required": true
      },
      {
        "name": "password",
        "type": "password",
        "label": "Password",
        "required": true
      },
      {
        "name": "remember",
        "type": "checkbox",
        "label": "Remember me"
      }
    ],
    "layout": "single-column",
    "includeValidation": true
  }
}
```

### Configure Dark Theme
```javascript
// Request
{
  "tool": "configure_theme",
  "arguments": {
    "mode": "dark",
    "colors": {
      "primary": "#3b82f6",
      "secondary": "#64748b",
      "success": "#10b981",
      "error": "#ef4444"
    }
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

### Linting & Formatting

```bash
# ESLint
npm run lint

# Prettier
npm run format
```

### Testing

```bash
# Jest
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## Project Structure

```
mcp-its-just-ui-server/
├── src/
│   ├── index.ts              # Main server entry point
│   ├── components/
│   │   └── registry.ts       # Component definitions and metadata
│   └── tools/
│       ├── componentGenerator.ts  # Component generation logic
│       ├── themeManager.ts       # Theme configuration tools
│       ├── utilityTools.ts       # Utility and layout tools
│       └── documentationTools.ts # Documentation and accessibility
├── dist/                      # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Recommended steps:
- Fork the repo and create a feature branch
- Add tests for new behavior
- Run lint and tests locally
- Open a PR with a clear description and examples

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact the maintainers.

## Related Links

- [its-just-ui Library](https://github.com/its-just-ui/just-ui)
- [its-just-ui on npm](https://www.npmjs.com/package/its-just-ui)
- [MCP SDK Documentation](https://modelcontextprotocol.io)
- [Claude Desktop](https://claude.ai)

## Troubleshooting

- **Cursor can’t find the server**: Ensure `dist/index.js` exists (`npm run build`) and the absolute path in `.cursor/mcp.json` is correct.
- **Tool not listed**: Restart Cursor, confirm `.cursor/mcp.json` or `~/.cursor/mcp.json` is valid JSON, and that `src/index.ts` lists tools in `ListToolsRequestSchema` handler.
- **Node version issues**: Use Node 18+ (`nvm use 18`), per the `engines` field.
- **Outputs look unsafe**: Generated snippets are plain strings meant to paste into your app. If you need stricter sanitization, wire `utils/validation.ts` into your own pipeline before rendering.