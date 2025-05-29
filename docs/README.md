# idea-ai-webforge Documentation

This project is a React application scaffolded with Vite. It showcases an AI-powered development pipeline with a minimal Node.js API server.

## Contents
- [Overview](#overview)
- [Local Development](#local-development)
- [API Server](#api-server)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Testing & Linting](#testing--linting)
- [Deployment](#deployment)
- [Support](#support)

## Overview

The application provides a dashboard for deploying websites and web apps using a collection of AI agents. It includes a chat interface for issuing commands, site management pages and database utilities.

## Local Development

Install dependencies and start the application with hot reloading:

```bash
npm install
npm run dev
```

The app runs on <http://localhost:5173> by default. For the mock API server, open another terminal and run:

```bash
npm run server
```

## API Server

The API server under `server/` is a lightweight Node.js HTTP server that stores data to `server/data.json`. It exposes endpoints for projects, deployments, sites and database tables. The server listens on port `3001` unless `PORT` is specified.

## Project Structure

```
src/        – React application source code
server/     – Minimal Node.js API server
public/     – Static assets served by Vite
```

## Environment Variables

Copy `.env.example` to `.env` and set your OpenAI API key:

```bash
cp .env.example .env
echo "VITE_OPENAI_API_KEY=YOUR_KEY" >> .env
```

## Testing & Linting

Run ESLint to check code style:

```bash
npm run lint
```

A production build can be generated with:

```bash
npm run build
```

## Deployment

Static files produced by the build can be served from any web server. Deployments are simulated via the API server. In a real environment you would replace the API with your deployment pipeline.

## Support

See [SUPPORT.md](./SUPPORT.md) for ways to get help or report issues.
