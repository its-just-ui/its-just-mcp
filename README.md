# MCP its-just-ui Server for Cursor

[![npm version](https://img.shields.io/npm/v/its-just-mcp?color=blue)](https://www.npmjs.com/package/its-just-mcp)
[![npm downloads](https://img.shields.io/npm/dm/its-just-mcp.svg)](https://www.npmjs.com/package/its-just-mcp)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Cursor Compatible](https://img.shields.io/badge/Cursor-Compatible-5C6EF8?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMyA3VjE3TDEyIDIyTDIxIDE3VjdMMTIgMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPg==)](https://www.cursor.com)
[![MCP SDK](https://img.shields.io/badge/MCP%20SDK-1.x-7A7AFF)](https://modelcontextprotocol.io)

A Model Context Protocol (MCP) server optimized for **Cursor IDE**, enabling AI-powered generation, customization, and documentation of its-just-ui React components directly in your editor.

### 🎯 Why Use This in Cursor?
- **Native MCP Support**: Cursor has built-in support for MCP servers via stdio
- **AI-Powered Component Generation**: Generate complete its-just-ui components with a simple prompt
- **Contextual Awareness**: The AI understands your project structure and existing code
- **Zero Configuration**: Works out of the box with minimal setup

### Table of Contents
- **🚀 Quick Start for Cursor**
- **⚙️ Cursor Configuration**
- **🛠️ Available Tools in Cursor**
- **💡 Cursor Usage Examples**
- **📚 Alternative: Claude Desktop**
- **Development**
- **Troubleshooting**
- **License**

## 🚀 Quick Start for Cursor

### Option 1: NPM Package (Recommended)
```bash
# Simply add to your Cursor config - no installation needed!
# Cursor will handle everything via npx
```

### Option 2: Local Development
```bash
# Clone and build
git clone https://github.com/its-just-ui/its-just-mcp.git
cd its-just-mcp
npm install && npm run build
```

## ⚙️ Cursor Configuration

### Step 1: Create MCP Configuration

#### Project-Level (Recommended)
Create `.cursor/mcp.json` in your React project root:

```json
{
  "mcpServers": {
    "its-just-ui": {
      "command": "npx",
      "args": ["-y", "its-just-mcp"],
      "env": {}
    }
  }
}
```

#### Global Configuration (All Projects)
Create `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "its-just-ui": {
      "command": "npx",
      "args": ["-y", "its-just-mcp"],
      "env": {}
    }
  }
}
```

#### Local Development Setup
If you're developing the MCP server locally:

```json
{
  "mcpServers": {
    "its-just-ui": {
      "command": "node",
      "args": ["/absolute/path/to/its-just-mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

### Step 2: Restart Cursor
After adding the configuration, restart Cursor to load the MCP server.

### Step 3: Verify Installation
In Cursor, you can ask the AI:
- "What MCP tools are available?"
- "Generate a Button component using its-just-ui"

## 🎨 Cursor-Specific Features

### Inline Component Generation
Ask Cursor AI to generate components directly in your code:
```
"Add a primary button with loading state here"
"Create a card grid layout with 3 columns"
"Generate a login form with validation"
```

### Context-Aware Suggestions
The MCP server understands your project context:
- Existing theme configuration
- Component usage patterns
- Project structure

### Quick Commands in Cursor
- **Generate**: `⌘+K` → "Generate [component] with [props]"
- **Document**: `⌘+K` → "Document this its-just-ui component"
- **Theme**: `⌘+K` → "Configure dark theme for its-just-ui"
- **Form**: `⌘+K` → "Create a contact form with validation"

## 🛠️ Available Tools in Cursor

### Component Generation
| Tool | Cursor Command Example | Description |
|------|------------------------|-------------|
| `generate_component` | "Generate a primary button" | Create any its-just-ui component |
| `list_components` | "Show me all form components" | Browse available components |
| `compose_components` | "Create a card grid layout" | Compose multiple components |

### Theme & Styling
| Tool | Cursor Command Example | Description |
|------|------------------------|-------------|
| `configure_theme` | "Set up dark mode theme" | Configure ThemeProvider |
| `generate_tailwind_classes` | "Generate spacing utilities" | Create Tailwind utility classes |
| `create_responsive_layout` | "Make a responsive grid" | Build responsive layouts |

### Forms & Documentation
| Tool | Cursor Command Example | Description |
|------|------------------------|-------------|
| `create_form` | "Build a contact form" | Generate complete forms |
| `get_component_docs` | "Show Button documentation" | Get component docs |
| `check_accessibility` | "Check Dialog accessibility" | Review ARIA attributes |

## 💡 Cursor Usage Examples

### Example 1: Generate a Component
In Cursor, simply type `⌘+K` and ask:
```
"Generate a primary button with loading state"
```

The AI will use the MCP server to generate:
```jsx
<Button variant="primary" loading={true}>
  Processing...
</Button>
```

### Example 2: Create a Complete Form
```
"Create a login form with email and password validation"
```

Result:
```jsx
<form onSubmit={handleSubmit}>
  <Input
    type="email"
    name="email"
    label="Email"
    required
    placeholder="Enter your email"
  />
  <Input
    type="password"
    name="password"
    label="Password"
    required
    minLength={8}
  />
  <Button type="submit" variant="primary">
    Login
  </Button>
</form>
```

### Example 3: Configure Theme
```
"Set up a dark theme with blue primary color"
```

Result:
```jsx
<ThemeProvider
  theme={{
    mode: "dark",
    colors: {
      primary: "#3b82f6",
      secondary: "#64748b"
    }
  }}
>
  {children}
</ThemeProvider>
```

## 📚 Alternative: Claude Desktop

While this server is optimized for Cursor, it also works with Claude Desktop:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "its-just-ui": {
      "command": "npx",
      "args": ["-y", "its-just-mcp"],
      "env": {}
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
its-just-mcp/
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

- [Cursor IDE](https://www.cursor.com) - The AI-first code editor
- [Cursor MCP Documentation](https://cursor-docs.apidog.io/model-context-protocol)
- [its-just-ui Library](https://github.com/its-just-ui/its-just-ui)
- [its-just-ui on npm](https://www.npmjs.com/package/its-just-ui)
- [MCP SDK Documentation](https://modelcontextprotocol.io)

## Troubleshooting

### Cursor-Specific Issues

| Issue | Solution |
|-------|----------|
| **MCP tools not available** | 1. Restart Cursor<br>2. Check `.cursor/mcp.json` is valid JSON<br>3. Verify the server path is correct |
| **"Command not found: npx"** | Install Node.js 18+ and npm |
| **Server not responding** | 1. Check Cursor Console (View → Output → MCP)<br>2. Try local installation instead of npx |
| **Tools not showing in AI** | Ask "What MCP tools are available?" to refresh |

### Common Fixes

```bash
# Verify Node version (needs 18+)
node --version

# For local development, rebuild
cd /path/to/its-just-mcp
npm run build

# Check MCP config is valid JSON
cat .cursor/mcp.json | jq .

# Clear npm cache if npx fails
npm cache clean --force
```

### Getting Help
- Check Cursor Console: `View → Output → MCP`
- Cursor MCP Docs: https://cursor-docs.apidog.io/model-context-protocol
- Open an issue: https://github.com/its-just-ui/its-just-mcp/issues