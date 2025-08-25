# rest.js

## Overview

rest.js is a modern full-stack web application built as a portfolio website for a software development company based in Chihuahua, Mexico. The application showcases the company's services, portfolio projects, team information, and provides a contact form for potential clients. It's designed as a comprehensive business website with a clean, professional interface that highlights the company's expertise in full-stack development, QA automation, and AI integrations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite for build tooling and development
- **Routing**: Client-side routing implemented with Wouter for lightweight navigation
- **UI Framework**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form validation
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful APIs with JSON responses
- **Data Storage**: In-memory storage (MemStorage) for development, with Drizzle ORM configured for PostgreSQL production use
- **Development Setup**: Vite middleware integration for hot module replacement in development

### Data Management
- **ORM**: Drizzle ORM with PostgreSQL dialect configured
- **Schema**: Centralized schema definitions in shared directory using Drizzle with Zod validation
- **Database Models**: User management and contact form submissions
- **Migrations**: Drizzle Kit for database migrations and schema management

### Content Management
- **Static Content**: JSON-based content management for company information, services, projects, and testimonials
- **Asset Management**: Image assets served via external CDN (Unsplash) for portfolio and testimonials
- **Internationalization**: Designed for single language (English) with potential for future i18n expansion

### Development Environment
- **Build System**: Vite for frontend bundling, esbuild for server-side compilation
- **Type Safety**: Comprehensive TypeScript configuration with strict mode enabled
- **Development Server**: Hot reload with Vite development server and Express backend integration
- **Code Organization**: Monorepo structure with shared types and schemas

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Hook Form, TanStack React Query
- **Build Tools**: Vite, TypeScript, esbuild for production builds
- **Routing**: Wouter for lightweight client-side routing

### UI and Styling
- **Component Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React for consistent iconography
- **Animations**: Class Variance Authority for component variants

### Backend and Database
- **Web Framework**: Express.js for REST API server
- **Database**: Neon Database (PostgreSQL) with connection pooling
- **ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL session store

### Validation and Types
- **Schema Validation**: Zod for runtime type validation
- **Form Validation**: @hookform/resolvers for React Hook Form integration
- **Type Generation**: Drizzle Zod for automatic schema-to-Zod type generation

### Development and Utilities
- **Date Handling**: date-fns for date manipulation and formatting
- **Utility Functions**: clsx and tailwind-merge for conditional styling
- **Development**: tsx for TypeScript execution, nanoid for unique ID generation

### External Services Integration
- **Image CDN**: Unsplash API for high-quality stock photography
- **Deployment**: Configured for cloud deployment with environment-based configuration
- **Analytics**: Ready for integration with analytics services (Google Analytics, etc.)