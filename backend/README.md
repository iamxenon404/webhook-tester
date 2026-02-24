# Webhook Tester Project README Files

---

## Backend README (Express.js)

````markdown
# Webhook Tester Backend

This is the **Express.js backend** for the Webhook Tester project. It handles webhook creation, captures incoming requests, and serves logs.

## Features

- Create unique webhook endpoints
- Capture all incoming requests (any HTTP method)
- Log request headers, body, query params, timestamp, and IP
- Retrieve logs via API

## Requirements

- Node.js v16+
- npm

## Setup

1. Clone the repo (backend folder only):
```bash
cd webhook-tester/backend
````

2. Initialize npm (if not done already):

```bash
npm init -y
```

3. Install dependencies:

```bash
npm install express cors body-parser nanoid
```

## Running the Server

```bash
node server.js
```

Server will run on **[http://localhost:5000](http://localhost:5000)** by default.

## API Endpoints

* `POST /create` → Creates a new webhook endpoint
* `ALL /hook/:id` → Capture any request sent to the endpoint
* `GET /:id` → Retrieve logs for a webhook

## Storage

* MVP: In-memory storage
* Future: JSON file, SQLite, MongoDB, Redis

## License

MIT License

````

---

Project Structure

```
webhook-tester/
│
├── backend/                  # Express backend
│   ├── src/
│   │   ├── app.js            # Core Express setup
│   │   ├── routes/
│   │   │   ├── create.js
│   │   │   ├── hook.js
│   │   │   └── logs.js
│   │   ├── utils/
│   │   │   ├── idGen.js
│   │   │   └── storage.js
│   │   └── middleware/
│   │       └── bodyParser.js
│   ├── storage/              # Optional file-based storage
│   │   └── data.json
│   └── server.js             # Entry point
│
├── frontend/                 # Next.js frontend
│   ├── pages/
│   │   ├── index.js          # Dashboard home
│   │   ├── logs/[id].js      # Logs view page
│   │   └── api/              # Next.js API routes if needed
│   ├── components/           # Reusable UI components
│   ├── public/
│   └── styles/
│
├── package.json              # Optionally root-level scripts
└── README.md