# Ache Engineering Solar Panels Frontend App

This is the frontend application for the web platform of `Ache Engineering`. It provides a user interface for managing and monitoring solar panel installations.

## Installation

To set up and install the project, follow these steps:

### Clone the repository

- Click on the Code button
- Copy the link for the HTTPS option
- Open your terminal and run the following command:

```bash
git clone [url-copied-from-github]
```

- Open the project in your IDE

### Install dependencies

This project uses the pnpm package manager due to its advantages over other package managers like npm or bun. You have the following options to install the dependencies:

- Install dependencies using npm:

```bash
npm install
```

- Install dependencies using pnpm:

```bash
npm install -g pnpm@latest
pnpm install
```

### Set up environment variables

To ensure the project works correctly, you need to set up the environment variables. These variables are required for database connection and NextAuth configuration. Next.js recommends having multiple environment variables depending on the runtime of the application, whether it is development or production. Therefore, you should configure both development and production environments with their respective variables.

1. Copy the example environment file to create your local environment files:

```bash
cp .env.example .env.development.local
cp .env.example .env.production.local
```

2. Open the `.env.development.local` and `.env.production.local` files and fill in the required values.

### Run the project

```bash
npm run dev
# or
pnpm dev
```

## Stack

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **NextAuth**: Authentication for Next.js applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **Prisma ORM**: An open-source database toolkit for TypeScript and Node.js.
- **TailwindCSS**: A utility-first CSS framework for rapidly building custom user interfaces.

## Structure

```sh
├── prisma/
│   ├── migrations/           # Database migration files
│   └── schema.prisma         # Database schema model
└── src/
    ├── app/                  # Application routes
    │   └── api/              # API routes
    │       ├── auth/         # Authentication routes using `next-auth`
    │       └── v1/           # Routes for retrieving data from the database
    ├── lib/                  # Methods, helpers, services, and utilities
    │   ├── @types/           # Interfaces and types
    │   ├── services/         # Services to fetch data for the APIs
    │   ├── actions.ts        # Server actions
    │   ├── auth.ts           # Configuration for `next-auth`
    │   ├── data.json         # Extra information
    │   ├── prisma.ts         # Prisma performance strategy
    │   ├── schemas.ts        # Zod schemas
    │   ├── types.d.ts        # Augmentation types or interfaces of dependencies
    │   └── utils.ts          # Methods, helpers, and utilities
    ├── ui/                   # UI components, styles, and related resources
    └── .pnpm-lock.yaml       # Project dependencies lock file
```
