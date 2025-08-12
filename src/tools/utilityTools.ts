export interface FormField {
  name: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export const utilityTools = {
  generateTailwindClasses(type: string, values?: Record<string, any>): string {
    switch (type) {
      case 'spacing':
        return this.generateSpacingClasses(values);
      case 'colors':
        return this.generateColorClasses(values);
      case 'typography':
        return this.generateTypographyClasses(values);
      case 'layout':
        return this.generateLayoutClasses(values);
      case 'effects':
        return this.generateEffectClasses(values);
      default:
        return '// Unknown type';
    }
  },

  generateSpacingClasses(_values?: Record<string, any>): string {
    const defaults = {
      padding: 'p-4',
      margin: 'm-2',
      gap: 'gap-4',
    };
    const config = { ...defaults, ..._values };
    
    return `// Spacing utility classes
const spacingClasses = {
  // Padding
  padding: '${config.padding}',
  paddingX: 'px-4',
  paddingY: 'py-4',
  paddingTop: 'pt-4',
  paddingRight: 'pr-4',
  paddingBottom: 'pb-4',
  paddingLeft: 'pl-4',
  
  // Margin
  margin: '${config.margin}',
  marginX: 'mx-auto',
  marginY: 'my-4',
  marginTop: 'mt-4',
  marginRight: 'mr-4',
  marginBottom: 'mb-4',
  marginLeft: 'ml-4',
  
  // Gap (for flex/grid)
  gap: '${config.gap}',
  gapX: 'gap-x-4',
  gapY: 'gap-y-4',
  
  // Space between (for flex children)
  spaceBetween: 'space-y-4',
  spaceX: 'space-x-4',
};

// Responsive spacing
const responsiveSpacing = 'p-2 md:p-4 lg:p-6 xl:p-8';`;
  },

  generateColorClasses(_values?: Record<string, any>): string {
    return `// Color utility classes
const colorClasses = {
  // Background colors
  bgPrimary: 'bg-blue-500',
  bgSecondary: 'bg-gray-500',
  bgSuccess: 'bg-green-500',
  bgWarning: 'bg-yellow-500',
  bgError: 'bg-red-500',
  bgWhite: 'bg-white',
  bgBlack: 'bg-black',
  bgTransparent: 'bg-transparent',
  
  // Text colors
  textPrimary: 'text-blue-500',
  textSecondary: 'text-gray-500',
  textSuccess: 'text-green-500',
  textWarning: 'text-yellow-500',
  textError: 'text-red-500',
  textWhite: 'text-white',
  textBlack: 'text-black',
  textMuted: 'text-gray-400',
  
  // Border colors
  borderPrimary: 'border-blue-500',
  borderSecondary: 'border-gray-500',
  borderSuccess: 'border-green-500',
  borderWarning: 'border-yellow-500',
  borderError: 'border-red-500',
  borderGray: 'border-gray-300',
  
  // Gradient backgrounds
  gradientPrimary: 'bg-gradient-to-r from-blue-400 to-blue-600',
  gradientSecondary: 'bg-gradient-to-r from-gray-400 to-gray-600',
  gradientSuccess: 'bg-gradient-to-r from-green-400 to-green-600',
};`;
  },

  generateTypographyClasses(_values?: Record<string, any>): string {
    return `// Typography utility classes
const typographyClasses = {
  // Font sizes
  textXs: 'text-xs',
  textSm: 'text-sm',
  textBase: 'text-base',
  textLg: 'text-lg',
  textXl: 'text-xl',
  text2xl: 'text-2xl',
  text3xl: 'text-3xl',
  text4xl: 'text-4xl',
  text5xl: 'text-5xl',
  
  // Font weights
  fontThin: 'font-thin',
  fontLight: 'font-light',
  fontNormal: 'font-normal',
  fontMedium: 'font-medium',
  fontSemibold: 'font-semibold',
  fontBold: 'font-bold',
  fontExtrabold: 'font-extrabold',
  
  // Text alignment
  textLeft: 'text-left',
  textCenter: 'text-center',
  textRight: 'text-right',
  textJustify: 'text-justify',
  
  // Line height
  leadingNone: 'leading-none',
  leadingTight: 'leading-tight',
  leadingSnug: 'leading-snug',
  leadingNormal: 'leading-normal',
  leadingRelaxed: 'leading-relaxed',
  leadingLoose: 'leading-loose',
  
  // Text decoration
  underline: 'underline',
  noUnderline: 'no-underline',
  lineThrough: 'line-through',
  
  // Text transform
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
  normalCase: 'normal-case',
};

// Responsive typography
const responsiveHeading = 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold';
const responsiveBody = 'text-sm md:text-base lg:text-lg';`;
  },

  generateLayoutClasses(_values?: Record<string, any>): string {
    return `// Layout utility classes
const layoutClasses = {
  // Display
  block: 'block',
  inlineBlock: 'inline-block',
  inline: 'inline',
  flex: 'flex',
  inlineFlex: 'inline-flex',
  grid: 'grid',
  hidden: 'hidden',
  
  // Flexbox
  flexRow: 'flex-row',
  flexCol: 'flex-col',
  flexWrap: 'flex-wrap',
  flexNoWrap: 'flex-nowrap',
  itemsStart: 'items-start',
  itemsCenter: 'items-center',
  itemsEnd: 'items-end',
  justifyStart: 'justify-start',
  justifyCenter: 'justify-center',
  justifyEnd: 'justify-end',
  justifyBetween: 'justify-between',
  justifyAround: 'justify-around',
  justifyEvenly: 'justify-evenly',
  
  // Grid
  gridCols1: 'grid-cols-1',
  gridCols2: 'grid-cols-2',
  gridCols3: 'grid-cols-3',
  gridCols4: 'grid-cols-4',
  gridCols6: 'grid-cols-6',
  gridCols12: 'grid-cols-12',
  
  // Position
  relative: 'relative',
  absolute: 'absolute',
  fixed: 'fixed',
  sticky: 'sticky',
  
  // Width & Height
  wFull: 'w-full',
  hFull: 'h-full',
  wScreen: 'w-screen',
  hScreen: 'h-screen',
  minHScreen: 'min-h-screen',
  maxWScreen: 'max-w-screen-xl',
  
  // Overflow
  overflowHidden: 'overflow-hidden',
  overflowAuto: 'overflow-auto',
  overflowScroll: 'overflow-scroll',
};

// Common layout patterns
const centerContent = 'flex items-center justify-center';
const container = 'container mx-auto px-4';
const responsiveGrid = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';`;
  },

  generateEffectClasses(_values?: Record<string, any>): string {
    return `// Effect utility classes
const effectClasses = {
  // Shadows
  shadowSm: 'shadow-sm',
  shadow: 'shadow',
  shadowMd: 'shadow-md',
  shadowLg: 'shadow-lg',
  shadowXl: 'shadow-xl',
  shadow2xl: 'shadow-2xl',
  shadowNone: 'shadow-none',
  
  // Rounded corners
  roundedNone: 'rounded-none',
  roundedSm: 'rounded-sm',
  rounded: 'rounded',
  roundedMd: 'rounded-md',
  roundedLg: 'rounded-lg',
  roundedXl: 'rounded-xl',
  rounded2xl: 'rounded-2xl',
  roundedFull: 'rounded-full',
  
  // Opacity
  opacity0: 'opacity-0',
  opacity25: 'opacity-25',
  opacity50: 'opacity-50',
  opacity75: 'opacity-75',
  opacity100: 'opacity-100',
  
  // Transitions
  transitionAll: 'transition-all',
  transitionColors: 'transition-colors',
  transitionOpacity: 'transition-opacity',
  transitionShadow: 'transition-shadow',
  transitionTransform: 'transition-transform',
  duration150: 'duration-150',
  duration300: 'duration-300',
  duration500: 'duration-500',
  
  // Transforms
  scale50: 'scale-50',
  scale75: 'scale-75',
  scale100: 'scale-100',
  scale125: 'scale-125',
  scale150: 'scale-150',
  rotate45: 'rotate-45',
  rotate90: 'rotate-90',
  rotate180: 'rotate-180',
  
  // Hover effects
  hoverScale: 'hover:scale-105',
  hoverShadow: 'hover:shadow-lg',
  hoverOpacity: 'hover:opacity-80',
  
  // Cursor
  cursorPointer: 'cursor-pointer',
  cursorNotAllowed: 'cursor-not-allowed',
  cursorWait: 'cursor-wait',
};

// Common effect combinations
const cardEffect = 'rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300';
const buttonEffect = 'rounded-md shadow-sm hover:shadow-md transition-all duration-150';`;
  },

  createResponsiveLayout(config: { type: string; breakpoints?: Record<string, string> }): string {
    const { type } = config;
    
    const layouts: Record<string, string> = {
      grid: `// Responsive Grid Layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
  <Card>Item 1</Card>
  <Card>Item 2</Card>
  <Card>Item 3</Card>
  <Card>Item 4</Card>
</div>`,
      
      flexbox: `// Responsive Flexbox Layout
<div className="flex flex-col md:flex-row gap-4 p-4">
  <div className="flex-1">
    <Card>Flex Item 1</Card>
  </div>
  <div className="flex-1">
    <Card>Flex Item 2</Card>
  </div>
  <div className="flex-1">
    <Card>Flex Item 3</Card>
  </div>
</div>`,
      
      container: `// Responsive Container Layout
<div className="container mx-auto px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
      Page Title
    </h1>
    <div className="prose lg:prose-xl">
      {/* Content */}
    </div>
  </div>
</div>`,
      
      sidebar: `// Responsive Sidebar Layout
<div className="flex flex-col md:flex-row min-h-screen">
  {/* Sidebar */}
  <aside className="w-full md:w-64 lg:w-72 bg-gray-100 p-4">
    <nav>
      <ul className="space-y-2">
        <li><Anchor href="#home">Home</Anchor></li>
        <li><Anchor href="#about">About</Anchor></li>
        <li><Anchor href="#contact">Contact</Anchor></li>
      </ul>
    </nav>
  </aside>
  
  {/* Main Content */}
  <main className="flex-1 p-4 md:p-6 lg:p-8">
    {/* Content */}
  </main>
</div>`,
      
      hero: `// Responsive Hero Section
<section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white">
  <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
        Welcome to Our Site
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl mb-8">
        Build amazing experiences with its-just-ui
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" variant="primary">Get Started</Button>
        <Button size="lg" variant="outline">Learn More</Button>
      </div>
    </div>
  </div>
</section>`,
      
      'card-grid': `// Responsive Card Grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 p-4">
  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
    <Card key={item} variant="elevated" className="hover:shadow-xl transition-shadow">
      <div className="aspect-video bg-gray-200 rounded-t-lg mb-4"></div>
      <h3 className="text-lg font-semibold mb-2">Card Title {item}</h3>
      <p className="text-gray-600 mb-4">Card description goes here.</p>
      <Button variant="primary" fullWidth>View Details</Button>
    </Card>
  ))}
</div>`,
    };

    return layouts[type] || layouts.container;
  },

  createForm(fields: FormField[], layout?: string, includeValidation?: boolean): string {
    const layoutClass = layout === 'two-column' 
      ? 'grid grid-cols-1 md:grid-cols-2 gap-4' 
      : layout === 'inline'
      ? 'flex flex-wrap gap-4'
      : 'space-y-4';

    const formFields = fields.map(field => {
      switch (field.type) {
        case 'text':
        case 'email':
        case 'password':
        case 'number':
          return `    <Input
      label="${field.label}"
      name="${field.name}"
      type="${field.type}"
      placeholder="${field.placeholder || `Enter ${field.label.toLowerCase()}`}"
      ${field.required ? 'required' : ''}
    />`;
        
        case 'select':
          return `    <Select
      label="${field.label}"
      name="${field.name}"
      options={${field.options ? JSON.stringify(field.options) : '[]'}}
      placeholder="${field.placeholder || `Select ${field.label.toLowerCase()}`}"
      ${field.required ? 'required' : ''}
    />`;
        
        case 'checkbox':
          return `    <Checkbox
      label="${field.label}"
      name="${field.name}"
    />`;
        
        case 'radio':
          return `    <RadioGroup
      label="${field.label}"
      name="${field.name}"
      options={${field.options ? JSON.stringify(field.options) : '[]'}}
      ${field.required ? 'required' : ''}
    />`;
        
        case 'date':
          return `    <DatePicker
      label="${field.label}"
      name="${field.name}"
      placeholder="${field.placeholder || 'Select date'}"
      ${field.required ? 'required' : ''}
    />`;
        
        case 'color':
          return `    <ColorPicker
      label="${field.label}"
      name="${field.name}"
    />`;
        
        case 'file':
          return `    <Upload
      label="${field.label}"
      name="${field.name}"
      ${field.required ? 'required' : ''}
    />`;
        
        default:
          return `    <Input
      label="${field.label}"
      name="${field.name}"
      ${field.required ? 'required' : ''}
    />`;
      }
    }).join('\n\n');

    let formCode = `import { ${this.getRequiredComponents(fields).join(', ')} } from 'its-just-ui';
${includeValidation ? "import { useState } from 'react';" : ''}

export default function CustomForm() {
  ${includeValidation ? this.generateValidationState(fields) : ''}
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ${includeValidation ? this.generateValidationLogic(fields) : '// Handle form submission'}
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <div className="${layoutClass}">
${formFields}
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
}`;

    return formCode;
  },

  getRequiredComponents(fields: FormField[]): string[] {
    const components = new Set(['Button']);
    
    fields.forEach(field => {
      switch (field.type) {
        case 'text':
        case 'email':
        case 'password':
        case 'number':
          components.add('Input');
          break;
        case 'select':
          components.add('Select');
          break;
        case 'checkbox':
          components.add('Checkbox');
          break;
        case 'radio':
          components.add('RadioGroup');
          break;
        case 'date':
          components.add('DatePicker');
          break;
        case 'color':
          components.add('ColorPicker');
          break;
        case 'file':
          components.add('Upload');
          break;
      }
    });
    
    return Array.from(components).sort();
  },

  generateValidationState(fields: FormField[]): string {
    const stateFields = fields.map(field => 
      `  const [${field.name}, set${field.name.charAt(0).toUpperCase() + field.name.slice(1)}] = useState('');`
    ).join('\n');
    
    return `${stateFields}
  const [errors, setErrors] = useState<Record<string, string>>({});`;
  },

  generateValidationLogic(fields: FormField[]): string {
    return `    const newErrors: Record<string, string> = {};
    
    ${fields.filter(f => f.required).map(field => `
    if (!${field.name}) {
      newErrors.${field.name} = '${field.label} is required';
    }`).join('')}
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Form is valid, proceed with submission
    console.log('Form submitted:', { ${fields.map(f => f.name).join(', ')} });`;
  }
};