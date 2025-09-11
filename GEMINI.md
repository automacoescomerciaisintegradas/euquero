
# Project Overview

This project is a full-stack application called "EuQuero", an intelligent automation platform. The entire application is in Brazilian Portuguese.

The frontend is a React application built with Vite, using TypeScript and Tailwind CSS. It is located in the `src/react-app` directory.

The backend is a Hono application running on Cloudflare Workers, with a D1 database for data storage and Supabase for file storage. The backend code is in the `src/worker` directory.

The application provides features like:
*   Instagram automation (photo and story uploads).
*   A credit system with PIX payments and webhook integration with n8n.
*   User authentication with OAuth (Google and GitHub).
*   A resume upload feature that stores files in Supabase.

# Building and Running

The following scripts are available in `package.json`:

*   `npm run dev`: Starts the development server for both the frontend and the backend.
*   `npm run build`: Builds the application for production.
*   `npm run check`: Type-checks the code, builds the application, and performs a dry run of the Cloudflare Workers deployment.
*   `npm run lint`: Lints the code using ESLint.
*   `npm run test:webhook`: Runs a test script for the PIX webhook.
*   `npm run test:instagram`: Runs a test script for the Instagram integration.
*   `npm run setup:instagram`: Sets up the Python environment for Instagram automation by running the `scripts/setup-python-env.bat` script.

## Running the application

1.  Install the dependencies: `npm install`
2.  Run the development server: `npm run dev`

# Development Conventions

*   **Language**: The project is written in TypeScript.
*   **Linting**: The project uses ESLint for code linting. Run `npm run lint` to check for linting errors.
*   **Structure**: The project follows a monorepo-like structure, with the frontend and backend code located in the `src` directory. A `shared` directory contains code that is used by both the frontend and the backend.
*   **Database**: The project uses Cloudflare D1 as its primary database. The database schema is defined in `src/worker/db.ts`.
*   **File Storage**: The project uses Supabase for file storage, specifically for the resume upload feature. The Supabase client is initialized in `src/worker/supabase.ts`.
*   **Documentation**: The project has extensive documentation in the `docs` directory, covering topics like Instagram automation, PIX webhook setup, and OAuth configuration.
