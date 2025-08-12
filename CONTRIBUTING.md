# Contributing to MCP its-just-ui Server

First off, thank you for considering contributing to MCP its-just-ui Server! It's people like you that make this tool better for everyone.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, please include:

- A clear and descriptive title
- Steps to reproduce the issue
- Expected behavior vs actual behavior
- Your environment (OS, Node.js version, etc.)
- Any relevant logs or error messages

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- Why this enhancement would be useful
- Possible implementation approach

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. Ensure the test suite passes (`npm test`)
4. Make sure your code lints (`npm run lint`)
5. Update documentation as needed
6. Issue that pull request!

## Development Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/yourusername/mcp-its-just-ui-server.git
cd mcp-its-just-ui-server
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run dev
```

4. Run tests:
```bash
npm test
npm run test:watch  # Watch mode
npm run test:coverage  # With coverage
```

5. Lint your code:
```bash
npm run lint
npm run format  # Auto-fix formatting
```

## Project Structure

```
src/
├── index.ts              # Main server entry
├── components/
│   └── registry.ts       # Component definitions
├── tools/                # Tool implementations
│   ├── componentGenerator.ts
│   ├── themeManager.ts
│   ├── utilityTools.ts
│   └── documentationTools.ts
├── utils/                # Utility functions
│   └── validation.ts
└── __tests__/           # Test files
```

## Coding Standards

- Use TypeScript for all new code
- Follow existing code style (enforced by ESLint and Prettier)
- Write meaningful commit messages following [Conventional Commits](https://www.conventionalcommits.org/)
- Add tests for new features
- Keep functions small and focused
- Document complex logic with comments
- Use descriptive variable and function names

## Commit Message Format

We follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(components): add support for Accordion component
fix(validation): handle edge case in color validation
docs: update README with new deployment options
```

## Testing Guidelines

- Write unit tests for all new functions
- Aim for >80% code coverage
- Test edge cases and error conditions
- Use descriptive test names
- Group related tests using `describe` blocks

Example test structure:
```typescript
describe('ComponentGenerator', () => {
  describe('generateComponent', () => {
    it('should generate a simple component', () => {
      // Test implementation
    });
    
    it('should handle error cases', () => {
      // Test error handling
    });
  });
});
```

## Adding New Components

To add support for a new its-just-ui component:

1. Add component definition to `src/components/registry.ts`
2. Include prop definitions and examples
3. Add tests for the new component
4. Update documentation

Example:
```typescript
this.register({
  name: 'NewComponent',
  category: 'category',
  description: 'Component description',
  props: {
    // Prop definitions
  },
  examples: [
    // Usage examples
  ],
  accessibility: [
    // Accessibility features
  ]
});
```

## Documentation

- Update README.md for user-facing changes
- Add JSDoc comments for public APIs
- Include code examples where helpful
- Keep documentation up-to-date with code changes

## Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create a pull request
4. After merge, create a GitHub release
5. CI/CD will automatically publish to npm

## Questions?

Feel free to open an issue for any questions about contributing!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.