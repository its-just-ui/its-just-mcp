export interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  props: Record<string, PropInfo>;
  examples: string[];
  accessibility: string[];
}

export interface PropInfo {
  type: string;
  required: boolean;
  default?: any;
  description: string;
  options?: string[];
}

class ComponentRegistry {
  private components: Map<string, ComponentInfo> = new Map();

  constructor() {
    this.initializeComponents();
  }

  private initializeComponents() {
    // Core Components
    this.register({
      name: "Button",
      category: "core",
      description:
        "A versatile button component with multiple variants and states",
      props: {
        variant: {
          type: "string",
          required: false,
          default: "primary",
          description: "Button variant",
          options: [
            "primary",
            "secondary",
            "outline",
            "ghost",
            "link",
            "destructive",
          ],
        },
        size: {
          type: "string",
          required: false,
          default: "md",
          description: "Button size",
          options: ["xs", "sm", "md", "lg", "xl"],
        },
        loading: {
          type: "boolean",
          required: false,
          default: false,
          description: "Show loading state",
        },
        disabled: {
          type: "boolean",
          required: false,
          default: false,
          description: "Disable the button",
        },
        fullWidth: {
          type: "boolean",
          required: false,
          default: false,
          description: "Make button full width",
        },
        onClick: {
          type: "function",
          required: false,
          description: "Click handler",
        },
      },
      examples: [
        '<Button variant="primary">Click me</Button>',
        '<Button variant="outline" size="lg">Large Button</Button>',
        "<Button loading>Loading...</Button>",
      ],
      accessibility: ["ARIA labels", "Keyboard navigation", "Focus states"],
    });

    this.register({
      name: "Badge",
      category: "core",
      description: "A small badge component for labels and status indicators",
      props: {
        variant: {
          type: "string",
          required: false,
          default: "default",
          description: "Badge variant",
          options: ["default", "success", "warning", "error", "info"],
        },
        size: {
          type: "string",
          required: false,
          default: "md",
          description: "Badge size",
          options: ["sm", "md", "lg"],
        },
      },
      examples: [
        '<Badge variant="success">Active</Badge>',
        '<Badge variant="error" size="sm">Error</Badge>',
      ],
      accessibility: ["ARIA labels", "Color contrast compliant"],
    });

    this.register({
      name: "Chip",
      category: "core",
      description: "A chip component for tags and selections",
      props: {
        variant: {
          type: "string",
          required: false,
          default: "filled",
          description: "Chip variant",
          options: ["filled", "outlined"],
        },
        color: {
          type: "string",
          required: false,
          default: "default",
          description: "Chip color",
          options: [
            "default",
            "primary",
            "secondary",
            "success",
            "warning",
            "error",
          ],
        },
        deletable: {
          type: "boolean",
          required: false,
          default: false,
          description: "Show delete button",
        },
        onDelete: {
          type: "function",
          required: false,
          description: "Delete handler",
        },
      },
      examples: [
        "<Chip>Tag</Chip>",
        '<Chip color="primary" deletable>Removable</Chip>',
      ],
      accessibility: ["ARIA labels", "Keyboard navigation for delete"],
    });

    // Form Components
    this.register({
      name: "Input",
      category: "form",
      description: "A text input component with validation support",
      props: {
        type: {
          type: "string",
          required: false,
          default: "text",
          description: "Input type",
          options: [
            "text",
            "email",
            "password",
            "number",
            "search",
            "tel",
            "url",
          ],
        },
        placeholder: {
          type: "string",
          required: false,
          description: "Placeholder text",
        },
        label: {
          type: "string",
          required: false,
          description: "Input label",
        },
        error: {
          type: "string",
          required: false,
          description: "Error message",
        },
        disabled: {
          type: "boolean",
          required: false,
          default: false,
          description: "Disable the input",
        },
        required: {
          type: "boolean",
          required: false,
          default: false,
          description: "Mark as required",
        },
      },
      examples: [
        '<Input label="Email" type="email" placeholder="Enter your email" />',
        '<Input label="Password" type="password" required />',
        '<Input label="Name" error="Name is required" />',
      ],
      accessibility: [
        "Label association",
        "Error announcements",
        "Required field indicators",
      ],
    });

    this.register({
      name: "Select",
      category: "form",
      description: "A dropdown select component",
      props: {
        options: {
          type: "array",
          required: true,
          description: "Array of options",
        },
        label: {
          type: "string",
          required: false,
          description: "Select label",
        },
        placeholder: {
          type: "string",
          required: false,
          description: "Placeholder text",
        },
        multiple: {
          type: "boolean",
          required: false,
          default: false,
          description: "Allow multiple selection",
        },
        searchable: {
          type: "boolean",
          required: false,
          default: false,
          description: "Enable search",
        },
      },
      examples: [
        '<Select label="Country" options={countries} placeholder="Select a country" />',
        "<Select options={tags} multiple searchable />",
      ],
      accessibility: [
        "Keyboard navigation",
        "Screen reader support",
        "ARIA listbox",
      ],
    });

    this.register({
      name: "Checkbox",
      category: "form",
      description: "A checkbox component",
      props: {
        label: {
          type: "string",
          required: false,
          description: "Checkbox label",
        },
        checked: {
          type: "boolean",
          required: false,
          description: "Checked state",
        },
        indeterminate: {
          type: "boolean",
          required: false,
          default: false,
          description: "Indeterminate state",
        },
        disabled: {
          type: "boolean",
          required: false,
          default: false,
          description: "Disable the checkbox",
        },
      },
      examples: [
        '<Checkbox label="I agree to the terms" />',
        '<Checkbox label="Select all" indeterminate />',
      ],
      accessibility: [
        "Label association",
        "Keyboard support",
        "ARIA checked state",
      ],
    });

    // Data Display Components
    this.register({
      name: "Card",
      category: "data-display",
      description: "A card container component",
      props: {
        variant: {
          type: "string",
          required: false,
          default: "elevated",
          description: "Card variant",
          options: ["flat", "elevated", "outlined"],
        },
        padding: {
          type: "string",
          required: false,
          default: "md",
          description: "Card padding",
          options: ["none", "sm", "md", "lg", "xl"],
        },
        clickable: {
          type: "boolean",
          required: false,
          default: false,
          description: "Make card clickable",
        },
      },
      examples: [
        '<Card variant="elevated"><p>Card content</p></Card>',
        '<Card variant="outlined" padding="lg" clickable>Clickable card</Card>',
      ],
      accessibility: ["Semantic HTML", "Interactive states"],
    });

    this.register({
      name: "Table",
      category: "data-display",
      description: "A data table component with sorting and pagination",
      props: {
        data: {
          type: "array",
          required: true,
          description: "Table data",
        },
        columns: {
          type: "array",
          required: true,
          description: "Column definitions",
        },
        sortable: {
          type: "boolean",
          required: false,
          default: false,
          description: "Enable sorting",
        },
        selectable: {
          type: "boolean",
          required: false,
          default: false,
          description: "Enable row selection",
        },
        pagination: {
          type: "boolean",
          required: false,
          default: false,
          description: "Enable pagination",
        },
      },
      examples: [
        "<Table data={users} columns={columns} sortable />",
        "<Table data={products} columns={productColumns} selectable pagination />",
      ],
      accessibility: [
        "Table semantics",
        "Header associations",
        "Keyboard navigation",
      ],
    });

    // Feedback Components
    this.register({
      name: "Alert",
      category: "feedback",
      description: "An alert message component",
      props: {
        variant: {
          type: "string",
          required: false,
          default: "info",
          description: "Alert variant",
          options: ["info", "success", "warning", "error"],
        },
        title: {
          type: "string",
          required: false,
          description: "Alert title",
        },
        dismissible: {
          type: "boolean",
          required: false,
          default: false,
          description: "Show dismiss button",
        },
      },
      examples: [
        '<Alert variant="success" title="Success!">Operation completed successfully</Alert>',
        '<Alert variant="error" dismissible>An error occurred</Alert>',
      ],
      accessibility: ["ARIA alert role", "Live regions", "Dismiss button"],
    });

    // Layout Components
    this.register({
      name: "Dialog",
      category: "layout",
      description: "A modal dialog component",
      props: {
        open: {
          type: "boolean",
          required: true,
          description: "Dialog open state",
        },
        onClose: {
          type: "function",
          required: true,
          description: "Close handler",
        },
        title: {
          type: "string",
          required: false,
          description: "Dialog title",
        },
        size: {
          type: "string",
          required: false,
          default: "md",
          description: "Dialog size",
          options: ["sm", "md", "lg", "xl", "full"],
        },
      },
      examples: [
        '<Dialog open={isOpen} onClose={handleClose} title="Confirm Action">Are you sure?</Dialog>',
        '<Dialog open={showModal} onClose={closeModal} size="lg">Content</Dialog>',
      ],
      accessibility: ["Focus trap", "ARIA dialog", "Escape key handling"],
    });

    // Add more components...
    this.register({
      name: "ThemeProvider",
      category: "core",
      description: "Provides theme context to child components",
      props: {
        theme: {
          type: "object",
          required: false,
          description: "Custom theme configuration",
        },
        mode: {
          type: "string",
          required: false,
          default: "light",
          description: "Theme mode",
          options: ["light", "dark", "system"],
        },
      },
      examples: [
        '<ThemeProvider mode="dark"><App /></ThemeProvider>',
        "<ThemeProvider theme={customTheme}><App /></ThemeProvider>",
      ],
      accessibility: ["Color contrast", "System preferences support"],
    });
  }

  register(component: ComponentInfo) {
    this.components.set(component.name, component);
  }

  getComponent(name: string): ComponentInfo | undefined {
    return this.components.get(name);
  }

  listComponents(category?: string): Record<string, string[]> {
    const result: Record<string, string[]> = {};

    for (const [name, info] of this.components) {
      if (!category || category === "all" || info.category === category) {
        if (!result[info.category]) {
          result[info.category] = [];
        }
        result[info.category].push(name);
      }
    }

    return result;
  }

  getAllComponents(): ComponentInfo[] {
    return Array.from(this.components.values());
  }
}

export const componentRegistry = new ComponentRegistry();
