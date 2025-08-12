# MCP its-just-ui Server Examples

## Quick Start Examples

### 1. Generate a Simple Button

**Request:**
```json
{
  "tool": "generate_component",
  "arguments": {
    "component": "Button",
    "props": {
      "variant": "primary",
      "size": "lg"
    },
    "children": "Click Me"
  }
}
```

**Output:**
```jsx
<Button variant="primary" size="lg">
  Click Me
</Button>
```

### 2. Create a Login Form

**Request:**
```json
{
  "tool": "create_form",
  "arguments": {
    "fields": [
      {
        "name": "email",
        "type": "email",
        "label": "Email Address",
        "required": true,
        "placeholder": "you@example.com"
      },
      {
        "name": "password",
        "type": "password",
        "label": "Password",
        "required": true,
        "placeholder": "Enter password"
      }
    ],
    "layout": "single-column",
    "includeValidation": true
  }
}
```

**Output:**
```jsx
import { Input, Button } from 'its-just-ui';
import { useState } from 'react';

export default function CustomForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email Address is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Form is valid, proceed with submission
    console.log('Form submitted:', { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <div className="space-y-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          required
        />
      </div>
      
      <div className="mt-6 flex gap-4">
        <Button type="submit" variant="primary">
          Submit
        </Button>
        <Button type="reset" variant="outline">
          Reset
        </Button>
      </div>
    </form>
  );
}
```

### 3. Configure Dark Theme

**Request:**
```json
{
  "tool": "configure_theme",
  "arguments": {
    "mode": "dark",
    "colors": {
      "primary": "#3b82f6",
      "secondary": "#64748b"
    }
  }
}
```

**Output:**
```jsx
import { ThemeProvider } from 'its-just-ui';
import 'its-just-ui/styles.css';

const customTheme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b'
  }
};

export default function App() {
  return (
    <ThemeProvider mode="dark" theme={customTheme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 4. Create a Card Grid Layout

**Request:**
```json
{
  "tool": "create_responsive_layout",
  "arguments": {
    "type": "card-grid"
  }
}
```

**Output:**
```jsx
// Responsive Card Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-4">
  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
    <Card key={item} variant="elevated" className="hover:shadow-xl transition-shadow">
      <div className="aspect-video bg-gray-200 rounded-t-lg mb-4"></div>
      <h3 className="text-lg font-semibold mb-2">Card Title {item}</h3>
      <p className="text-gray-600 mb-4">Card description goes here.</p>
      <Button variant="primary" fullWidth>View Details</Button>
    </Card>
  ))}
</div>
```

### 5. Compose Multiple Components

**Request:**
```json
{
  "tool": "compose_components",
  "arguments": {
    "components": [
      {
        "type": "Card",
        "props": { "variant": "elevated", "padding": "lg" },
        "children": "Welcome to our app!"
      },
      {
        "type": "Input",
        "props": { "label": "Search", "placeholder": "Search..." }
      },
      {
        "type": "Button",
        "props": { "variant": "primary", "fullWidth": true },
        "children": "Search"
      }
    ],
    "layout": "vertical"
  }
}
```

**Output:**
```jsx
<div className="flex flex-col gap-4">
  <Card variant="elevated" padding="lg">
    Welcome to our app!
  </Card>
  <Input label="Search" placeholder="Search..." />
  <Button variant="primary" fullWidth={true}>
    Search
  </Button>
</div>
```

### 6. Get Component Documentation

**Request:**
```json
{
  "tool": "get_component_docs",
  "arguments": {
    "component": "Button",
    "section": "props"
  }
}
```

**Output:**
```markdown
# Button Props

## Props Reference

| Prop | Type | Required | Default | Description | Options |
|------|------|----------|---------|-------------|---------|
| variant | `string` | No | `primary` | Button variant | `primary` | `secondary` | `outline` | `ghost` | `link` | `destructive` |
| size | `string` | No | `md` | Button size | `xs` | `sm` | `md` | `lg` | `xl` |
| loading | `boolean` | No | `false` | Show loading state | - |
| disabled | `boolean` | No | `false` | Disable the button | - |
| fullWidth | `boolean` | No | `false` | Make button full width | - |
| onClick | `function` | No | - | Click handler | - |

## TypeScript Interface
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}
```
```

### 7. Generate Tailwind Utility Classes

**Request:**
```json
{
  "tool": "generate_tailwind_classes",
  "arguments": {
    "type": "spacing",
    "values": {
      "padding": "p-8",
      "margin": "m-4"
    }
  }
}
```

**Output:**
```javascript
// Spacing utility classes
const spacingClasses = {
  // Padding
  padding: 'p-8',
  paddingX: 'px-4',
  paddingY: 'py-4',
  // ... more spacing classes
};

// Responsive spacing
const responsiveSpacing = 'p-2 md:p-4 lg:p-6 xl:p-8';
```

### 8. Check Component Accessibility

**Request:**
```json
{
  "tool": "check_accessibility",
  "arguments": {
    "component": "Dialog"
  }
}
```

**Output:**
```markdown
# Dialog Accessibility Check

## ✅ Accessibility Features
- ✓ Focus trap
- ✓ ARIA dialog
- ✓ Escape key handling

## Component Accessibility Score: A+

### Compliance Status
- **WCAG 2.1 Level A**: ✅ Compliant
- **WCAG 2.1 Level AA**: ✅ Compliant
- **Section 508**: ✅ Compliant
- **ADA**: ✅ Compliant
```

## Advanced Examples

### Creating a Dashboard Layout

**Request:**
```json
{
  "tool": "create_responsive_layout",
  "arguments": {
    "type": "sidebar"
  }
}
```

### Building a Complex Form

**Request:**
```json
{
  "tool": "create_form",
  "arguments": {
    "fields": [
      {
        "name": "firstName",
        "type": "text",
        "label": "First Name",
        "required": true
      },
      {
        "name": "lastName",
        "type": "text",
        "label": "Last Name",
        "required": true
      },
      {
        "name": "birthDate",
        "type": "date",
        "label": "Date of Birth",
        "required": true
      },
      {
        "name": "country",
        "type": "select",
        "label": "Country",
        "options": ["USA", "Canada", "UK", "Australia"],
        "required": true
      },
      {
        "name": "newsletter",
        "type": "checkbox",
        "label": "Subscribe to newsletter"
      }
    ],
    "layout": "two-column",
    "includeValidation": true
  }
}
```

## Using with Claude Desktop

1. After configuring the server in Claude Desktop, you can use natural language:
   - "Generate a primary button that says 'Get Started'"
   - "Create a login form with email and password fields"
   - "Build a responsive card grid layout"
   - "Configure a dark theme with blue primary color"

2. The server will automatically use the appropriate tool based on your request.

3. You can combine multiple tools in a conversation to build complete UI components.