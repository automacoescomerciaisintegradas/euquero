# Coding Standards for EuQuero

## TypeScript Guidelines

- Use strict TypeScript configuration
- Prefer explicit types over `any`
- Use Zod schemas for runtime validation
- Define shared types in `src/shared/types.ts`
- Use proper type imports: `import type { ... }`

## React Best Practices

- Use functional components with hooks
- Prefer composition over inheritance
- Use proper component naming (PascalCase)
- Keep components focused and single-purpose
- Use React 19 features appropriately

## File Organization

- Components go in `src/react-app/components/`
- Pages go in `src/react-app/pages/`
- Shared utilities in `src/shared/`
- API routes in `src/worker/`
- Use kebab-case for file names
- Use PascalCase for component files

## Styling Guidelines

- Use Tailwind CSS utility classes
- Prefer utility classes over custom CSS
- Use responsive design patterns
- Follow consistent spacing and color schemes
- Use Lucide React for icons

## API Development

- Use Hono framework patterns
- Implement proper error handling
- Use Zod validators for request validation
- Follow RESTful conventions
- Return consistent response formats

## Code Quality

- Run ESLint before commits
- Use TypeScript strict mode
- Write descriptive commit messages
- Keep functions small and focused
- Use meaningful variable names

## Testing Approach

- Write unit tests for utilities
- Test API endpoints thoroughly
- Use integration tests for critical flows
- Mock external dependencies appropriately
