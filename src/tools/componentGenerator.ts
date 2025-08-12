import { componentRegistry } from "../components/registry.js";
import { validateProps } from "../utils/validation.js";

export function generateComponent(
  componentName: string,
  props?: Record<string, any>,
  children?: string,
  className?: string,
): string {
  const component = componentRegistry.getComponent(componentName);

  if (!component) {
    throw new Error(`Component "${componentName}" not found in registry`);
  }

  const sanitizedProps = validateProps(props);
  const propsString = formatProps(sanitizedProps, className);
  const childrenContent = children || "";

  if (childrenContent) {
    return `<${componentName}${propsString}>\n  ${childrenContent}\n</${componentName}>`;
  } else {
    return `<${componentName}${propsString} />`;
  }
}

function formatProps(props?: Record<string, any>, className?: string): string {
  if (!props && !className) return "";

  const allProps: Record<string, any> = { ...props };
  if (className) {
    allProps.className = className;
  }

  const propsArray = Object.entries(allProps)
    .map(([key, value]) => {
      if (typeof value === "boolean") {
        return value ? key : "";
      } else if (typeof value === "string") {
        return `${key}="${value}"`;
      } else if (typeof value === "number") {
        return `${key}={${value}}`;
      } else if (typeof value === "object") {
        return `${key}={${JSON.stringify(value)}}`;
      } else if (typeof value === "function") {
        return `${key}={${value.toString()}}`;
      }
      return "";
    })
    .filter(Boolean);

  return propsArray.length > 0 ? " " + propsArray.join(" ") : "";
}

generateComponent.compose = function (
  components: Array<{
    type: string;
    props?: Record<string, any>;
    children?: string;
  }>,
  layout: string = "vertical",
): string {
  const layoutClasses: Record<string, string> = {
    vertical: "flex flex-col gap-4",
    horizontal: "flex flex-row gap-4",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  };

  const componentCode = components
    .map((comp) => generateComponent(comp.type, comp.props, comp.children))
    .join("\n  ");

  return `<div className="${layoutClasses[layout] || layoutClasses.vertical}">
  ${componentCode}
</div>`;
};

export function generateComponentWithImports(
  componentName: string,
  props?: Record<string, any>,
  children?: string,
  className?: string,
): string {
  const componentCode = generateComponent(
    componentName,
    props,
    children,
    className,
  );

  return `import { ${componentName} } from 'its-just-ui';
import 'its-just-ui/styles.css';

export default function MyComponent() {
  return (
    ${componentCode
      .split("\n")
      .map((line) => "    " + line)
      .join("\n")
      .trim()}
  );
}`;
}
