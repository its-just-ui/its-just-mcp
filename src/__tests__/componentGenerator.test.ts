import { generateComponent } from '../tools/componentGenerator';
import { componentRegistry } from '../components/registry';

describe('Component Generator', () => {
  beforeAll(() => {
    // Ensure registry is initialized
    componentRegistry.getComponent('Button');
  });

  describe('generateComponent', () => {
    it('should generate a simple component without props', () => {
      const result = generateComponent('Button');
      expect(result).toBe('<Button />');
    });

    it('should generate a component with props', () => {
      const result = generateComponent('Button', { variant: 'primary', size: 'lg' });
      expect(result).toContain('variant="primary"');
      expect(result).toContain('size="lg"');
    });

    it('should generate a component with children', () => {
      const result = generateComponent('Button', {}, 'Click me');
      expect(result).toBe('<Button>\n  Click me\n</Button>');
    });

    it('should generate a component with className', () => {
      const result = generateComponent('Button', {}, undefined, 'mt-4');
      expect(result).toContain('className="mt-4"');
    });

    it('should handle boolean props correctly', () => {
      const result = generateComponent('Button', { disabled: true, loading: false });
      expect(result).toContain('disabled');
      expect(result).not.toContain('loading');
    });

    it('should handle number props correctly', () => {
      const result = generateComponent('Input', { maxLength: 100 });
      expect(result).toContain('maxLength={100}');
    });

    it('should throw error for invalid component', () => {
      expect(() => generateComponent('InvalidComponent')).toThrow('Component "InvalidComponent" not found');
    });

    it('should sanitize string props to prevent XSS', () => {
      const result = generateComponent('Button', { title: '<script>alert("xss")</script>' });
      expect(result).not.toContain('<script>');
    });
  });

  describe('compose', () => {
    it('should compose multiple components vertically', () => {
      const result = generateComponent.compose([
        { type: 'Button', props: { variant: 'primary' } },
        { type: 'Input', props: { label: 'Email' } }
      ], 'vertical');
      
      expect(result).toContain('flex flex-col gap-4');
      expect(result).toContain('<Button');
      expect(result).toContain('<Input');
    });

    it('should compose components with horizontal layout', () => {
      const result = generateComponent.compose([
        { type: 'Button' },
        { type: 'Badge' }
      ], 'horizontal');
      
      expect(result).toContain('flex flex-row gap-4');
    });

    it('should compose components with grid layout', () => {
      const result = generateComponent.compose([
        { type: 'Card' },
        { type: 'Card' },
        { type: 'Card' }
      ], 'grid');
      
      expect(result).toContain('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3');
    });

    it('should default to vertical layout if invalid layout provided', () => {
      const result = generateComponent.compose([
        { type: 'Button' }
      ], 'invalid' as any);
      
      expect(result).toContain('flex flex-col gap-4');
    });
  });
});