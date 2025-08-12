#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { componentRegistry } from './components/registry.js';
import { generateComponent } from './tools/componentGenerator.js';
import { themeTools } from './tools/themeManager.js';
import { utilityTools } from './tools/utilityTools.js';
import { documentationTools } from './tools/documentationTools.js';

const server = new Server(
  {
    name: 'mcp-its-just-ui-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool Schemas
const GenerateComponentSchema = z.object({
  component: z.string().describe('Name of the its-just-ui component to generate'),
  props: z.record(z.any()).optional().describe('Props to pass to the component'),
  children: z.string().optional().describe('Children content for the component'),
  className: z.string().optional().describe('Additional Tailwind CSS classes'),
});

const ListComponentsSchema = z.object({
  category: z.enum(['all', 'core', 'navigation', 'form', 'data-display', 'feedback', 'layout']).optional()
    .describe('Filter components by category'),
});

const ComposeComponentsSchema = z.object({
  components: z.array(z.object({
    type: z.string(),
    props: z.record(z.any()).optional(),
    children: z.string().optional(),
  })).describe('Array of components to compose'),
  layout: z.enum(['vertical', 'horizontal', 'grid']).optional().describe('Layout for composition'),
});

const ConfigureThemeSchema = z.object({
  mode: z.enum(['light', 'dark', 'system']).optional(),
  colors: z.object({
    primary: z.string().optional(),
    secondary: z.string().optional(),
    success: z.string().optional(),
    warning: z.string().optional(),
    error: z.string().optional(),
    info: z.string().optional(),
  }).optional(),
  borderRadius: z.string().optional(),
  fontFamily: z.string().optional(),
});

const GenerateTailwindClassesSchema = z.object({
  type: z.enum(['spacing', 'colors', 'typography', 'layout', 'effects']),
  values: z.record(z.any()).optional(),
});

const CreateFormSchema = z.object({
  fields: z.array(z.object({
    name: z.string(),
    type: z.enum(['text', 'email', 'password', 'number', 'select', 'checkbox', 'radio', 'date', 'color', 'file']),
    label: z.string(),
    required: z.boolean().optional(),
    placeholder: z.string().optional(),
    options: z.array(z.string()).optional(),
  })),
  layout: z.enum(['single-column', 'two-column', 'inline']).optional(),
  includeValidation: z.boolean().optional(),
});

const GetComponentDocsSchema = z.object({
  component: z.string().describe('Component name to get documentation for'),
  section: z.enum(['usage', 'props', 'examples', 'accessibility']).optional(),
});

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'generate_component',
        description: 'Generate an its-just-ui component with specified props and styling',
        inputSchema: {
          type: 'object',
          properties: {
            component: { type: 'string', description: 'Name of the its-just-ui component' },
            props: { type: 'object', description: 'Props to pass to the component' },
            children: { type: 'string', description: 'Children content for the component' },
            className: { type: 'string', description: 'Additional Tailwind CSS classes' },
          },
          required: ['component'],
        },
      },
      {
        name: 'list_components',
        description: 'List available its-just-ui components and their categories',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              enum: ['all', 'core', 'navigation', 'form', 'data-display', 'feedback', 'layout'],
              description: 'Filter components by category',
            },
          },
        },
      },
      {
        name: 'compose_components',
        description: 'Create a composition of multiple its-just-ui components',
        inputSchema: {
          type: 'object',
          properties: {
            components: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  props: { type: 'object' },
                  children: { type: 'string' },
                },
                required: ['type'],
              },
            },
            layout: {
              type: 'string',
              enum: ['vertical', 'horizontal', 'grid'],
              description: 'Layout for composition',
            },
          },
          required: ['components'],
        },
      },
      {
        name: 'configure_theme',
        description: 'Configure theme settings including colors, mode, and typography',
        inputSchema: {
          type: 'object',
          properties: {
            mode: { type: 'string', enum: ['light', 'dark', 'system'] },
            colors: {
              type: 'object',
              properties: {
                primary: { type: 'string' },
                secondary: { type: 'string' },
                success: { type: 'string' },
                warning: { type: 'string' },
                error: { type: 'string' },
                info: { type: 'string' },
              },
            },
            borderRadius: { type: 'string' },
            fontFamily: { type: 'string' },
          },
        },
      },
      {
        name: 'generate_tailwind_classes',
        description: 'Generate Tailwind utility classes for specific use cases',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['spacing', 'colors', 'typography', 'layout', 'effects'],
            },
            values: { type: 'object' },
          },
          required: ['type'],
        },
      },
      {
        name: 'create_responsive_layout',
        description: 'Create a responsive layout using Tailwind CSS and its-just-ui components',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['grid', 'flexbox', 'container', 'sidebar', 'hero', 'card-grid'],
            },
            breakpoints: {
              type: 'object',
              properties: {
                sm: { type: 'string' },
                md: { type: 'string' },
                lg: { type: 'string' },
                xl: { type: 'string' },
              },
            },
          },
          required: ['type'],
        },
      },
      {
        name: 'create_form',
        description: 'Generate a form structure using its-just-ui form components',
        inputSchema: {
          type: 'object',
          properties: {
            fields: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  type: {
                    type: 'string',
                    enum: ['text', 'email', 'password', 'number', 'select', 'checkbox', 'radio', 'date', 'color', 'file'],
                  },
                  label: { type: 'string' },
                  required: { type: 'boolean' },
                  placeholder: { type: 'string' },
                  options: { type: 'array', items: { type: 'string' } },
                },
                required: ['name', 'type', 'label'],
              },
            },
            layout: {
              type: 'string',
              enum: ['single-column', 'two-column', 'inline'],
            },
            includeValidation: { type: 'boolean' },
          },
          required: ['fields'],
        },
      },
      {
        name: 'get_component_docs',
        description: 'Get documentation, usage examples, and prop descriptions for a component',
        inputSchema: {
          type: 'object',
          properties: {
            component: { type: 'string', description: 'Component name' },
            section: {
              type: 'string',
              enum: ['usage', 'props', 'examples', 'accessibility'],
            },
          },
          required: ['component'],
        },
      },
      {
        name: 'check_accessibility',
        description: 'Get accessibility features and ARIA attributes for a component',
        inputSchema: {
          type: 'object',
          properties: {
            component: { type: 'string', description: 'Component name' },
          },
          required: ['component'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'generate_component': {
        const { component, props, children, className } = GenerateComponentSchema.parse(args);
        const code = generateComponent(component, props, children, className);
        return {
          content: [
            {
              type: 'text',
              text: code,
            },
          ],
        };
      }

      case 'list_components': {
        const { category } = ListComponentsSchema.parse(args);
        const components = componentRegistry.listComponents(category);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(components, null, 2),
            },
          ],
        };
      }

      case 'compose_components': {
        const { components, layout } = ComposeComponentsSchema.parse(args);
        const composition = generateComponent.compose(components, layout);
        return {
          content: [
            {
              type: 'text',
              text: composition,
            },
          ],
        };
      }

      case 'configure_theme': {
        const config = ConfigureThemeSchema.parse(args);
        const themeCode = themeTools.configureTheme(config);
        return {
          content: [
            {
              type: 'text',
              text: themeCode,
            },
          ],
        };
      }

      case 'generate_tailwind_classes': {
        const { type, values } = GenerateTailwindClassesSchema.parse(args);
        const classes = utilityTools.generateTailwindClasses(type, values);
        return {
          content: [
            {
              type: 'text',
              text: classes,
            },
          ],
        };
      }

      case 'create_responsive_layout': {
        const config = z.object({
          type: z.string(),
          breakpoints: z.record(z.string()).optional(),
        }).parse(args);
        const layout = utilityTools.createResponsiveLayout(config);
        return {
          content: [
            {
              type: 'text',
              text: layout,
            },
          ],
        };
      }

      case 'create_form': {
        const { fields, layout, includeValidation } = CreateFormSchema.parse(args);
        const formCode = utilityTools.createForm(fields, layout, includeValidation);
        return {
          content: [
            {
              type: 'text',
              text: formCode,
            },
          ],
        };
      }

      case 'get_component_docs': {
        const { component, section } = GetComponentDocsSchema.parse(args);
        const docs = documentationTools.getComponentDocs(component, section);
        return {
          content: [
            {
              type: 'text',
              text: docs,
            },
          ],
        };
      }

      case 'check_accessibility': {
        const { component } = z.object({ component: z.string() }).parse(args);
        const a11y = documentationTools.checkAccessibility(component);
        return {
          content: [
            {
              type: 'text',
              text: a11y,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${errorMessage}`,
        },
      ],
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP its-just-ui server started');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});