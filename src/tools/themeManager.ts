export interface ThemeConfig {
  mode?: "light" | "dark" | "system";
  colors?: {
    primary?: string;
    secondary?: string;
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
  };
  borderRadius?: string;
  fontFamily?: string;
}

export const themeTools = {
  configureTheme(config: ThemeConfig): string {
    const { mode, colors, borderRadius, fontFamily } = config;

    let themeCode = `import { ThemeProvider } from 'its-just-ui';
import 'its-just-ui/styles.css';

const customTheme = {`;

    if (colors) {
      themeCode += `
  colors: {${Object.entries(colors)
    .map(
      ([key, value]) => `
    ${key}: '${value}'`,
    )
    .join(",")}
  },`;
    }

    if (borderRadius) {
      themeCode += `
  borderRadius: '${borderRadius}',`;
    }

    if (fontFamily) {
      themeCode += `
  fontFamily: '${fontFamily}',`;
    }

    themeCode += `
};

export default function App() {
  return (
    <ThemeProvider ${mode ? `mode="${mode}"` : ""} theme={customTheme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}`;

    return themeCode;
  },

  generateColorPalette(baseColor: string): string {
    return `// Color palette generated from base color: ${baseColor}
const colorPalette = {
  50: '${baseColor}10',  // 10% opacity
  100: '${baseColor}20', // 20% opacity
  200: '${baseColor}30', // 30% opacity
  300: '${baseColor}40', // 40% opacity
  400: '${baseColor}50', // 50% opacity
  500: '${baseColor}',   // Base color
  600: '${baseColor}E6', // 90% opacity
  700: '${baseColor}CC', // 80% opacity
  800: '${baseColor}B3', // 70% opacity
  900: '${baseColor}99', // 60% opacity
};

// Usage in theme configuration
const theme = {
  colors: {
    primary: colorPalette[500],
    primaryLight: colorPalette[100],
    primaryDark: colorPalette[700],
  }
};`;
  },

  generateDarkModeStyles(): string {
    return `// Dark mode configuration for its-just-ui
import { ThemeProvider } from 'its-just-ui';

const darkTheme = {
  colors: {
    background: '#0f172a',
    foreground: '#f8fafc',
    card: '#1e293b',
    cardForeground: '#f8fafc',
    primary: '#3b82f6',
    primaryForeground: '#ffffff',
    secondary: '#64748b',
    secondaryForeground: '#ffffff',
    muted: '#334155',
    mutedForeground: '#94a3b8',
    accent: '#6366f1',
    accentForeground: '#ffffff',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    border: '#334155',
    input: '#1e293b',
    ring: '#3b82f6',
  }
};

// Automatic dark mode based on system preference
export function AppWithDarkMode() {
  return (
    <ThemeProvider mode="system" theme={darkTheme}>
      {/* Your app automatically switches between light and dark */}
    </ThemeProvider>
  );
}

// Manual dark mode toggle
export function AppWithToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeProvider mode={mode} theme={mode === 'dark' ? darkTheme : undefined}>
      <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
        Toggle {mode === 'light' ? '🌙' : '☀️'}
      </Button>
      {/* Your app content */}
    </ThemeProvider>
  );
}`;
  },

  generateComponentVariants(componentName: string): string {
    return `// Custom variants for ${componentName} component
const ${componentName.toLowerCase()}Variants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-500 text-white hover:bg-gray-600',
  success: 'bg-green-500 text-white hover:bg-green-600',
  warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-700 hover:bg-gray-100',
  link: 'text-blue-500 underline hover:text-blue-600',
};

// Usage with custom styling
<${componentName} 
  className={${componentName.toLowerCase()}Variants.primary}
>
  Custom Styled ${componentName}
</${componentName}>`;
  },

  generateResponsiveTheme(): string {
    return `// Responsive theme configuration
const responsiveTheme = {
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  spacing: {
    mobile: {
      padding: '1rem',
      gap: '0.5rem',
    },
    tablet: {
      padding: '1.5rem',
      gap: '1rem',
    },
    desktop: {
      padding: '2rem',
      gap: '1.5rem',
    },
  },
  typography: {
    mobile: {
      h1: 'text-2xl',
      h2: 'text-xl',
      body: 'text-base',
    },
    desktop: {
      h1: 'text-4xl',
      h2: 'text-3xl',
      body: 'text-lg',
    },
  },
};

// Responsive component usage
<div className="p-4 md:p-6 lg:p-8">
  <h1 className="text-2xl md:text-3xl lg:text-4xl">
    Responsive Heading
  </h1>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Responsive grid layout */}
  </div>
</div>`;
  },
};
