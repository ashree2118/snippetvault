# Snippet

Snippet is a powerful tool to save code snippets, articles, and error solutions from the web. It uses AI to automatically generate clear titles and tags, making it easy to organize and retrieve your saved content.

## Demo

[Watch the demo on YouTube](https://www.youtube.com/watch?v=byIdb-v6HTI)

## Tech Stack

- **Frontend/Backend**: Next.js (React)
- **Database**: PostgreSQL
- **Cache**: Redis
- **Extension**: Chrome Extension (Manifest V3)
- **Containerization**: Docker
- **AI**: Gemini API key
- **State management**: Zustand

## Prerequisites

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/) (Version 18 or later recommended)

## Getting Started

### 1. Start Services

Use Docker Compose to start the PostgreSQL and Redis services.

```bash
docker-compose up -d
```

### 2. Setup Web Application

Navigate to the `web` directory, install dependencies, and start the development server.

```bash
cd web
npm install
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### 3. Load the Extension

1.  Open Chrome and navigate to `chrome://extensions`.
2.  Enable "Developer mode" in the top right corner.
3.  Click "Load unpacked".
4.  Select the `extension` directory from this project.
5.  Pin the extension and start saving snippets!

## License

This project is open source.
