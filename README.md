# PocketMine-MP Server Dashboard

This is a web dashboard for monitoring a PocketMine-MP server, built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- **Home (`/`)**: Displays the server status, including CPU usage, RAM usage, and player counts.
- **Players (`/players`)**: Shows a list of online players with a search function.

## Mock API

The project uses a mock API to simulate server data:

- `/api/status`: Provides server status information.
- `/api/players`: Provides a list of online players.

Actual server integration logic is available but commented out in `src/lib/pocketmine.ts`.