# Development Workflow for EuQuero

## Local Development Setup

1. **Installation**: Run `npm install` to install dependencies
2. **Development Server**: Use `npm run dev` for hot-reload development
3. **Type Checking**: TypeScript compilation happens automatically
4. **Linting**: Run `npm run lint` to check code quality

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run check` - Validate deployment without deploying
- `npm run lint` - Run ESLint checks
- `npm run cf-typegen` - Generate Cloudflare Worker types

## Feature Development Process

1. **Planning**: Create or update specs in `.kiro/specs/`
2. **Implementation**: Follow the task list from specs
3. **Testing**: Test both frontend and backend functionality
4. **Validation**: Run `npm run check` before deployment
5. **Deployment**: Use wrangler for Cloudflare Workers deployment

## Code Review Guidelines

- Ensure TypeScript compilation passes
- Verify ESLint rules are followed
- Check that Zod validation is properly implemented
- Validate responsive design works correctly
- Test API endpoints manually or with automated tests

## Git Workflow

- Use descriptive commit messages
- Keep commits focused and atomic
- Test locally before pushing
- Use feature branches for new functionality

## Debugging Approach

- **Frontend**: Use browser dev tools and React DevTools
- **Backend**: Use Wrangler local development and console logging
- **Network**: Monitor API calls in browser network tab
- **Types**: Leverage TypeScript compiler errors for early detection

## Environment Management

- **Local**: Development server with hot reload
- **Staging**: Use `wrangler deploy --dry-run` for validation
- **Production**: Deploy via wrangler to Cloudflare Workers

## Performance Monitoring

- Monitor bundle size with Vite build output
- Check Cloudflare Workers analytics for backend performance
- Use browser performance tools for frontend optimization
- Monitor Core Web Vitals for user experience
