# Webhook Tester / Request Inspector

A complete project specification and structure overview for building an open-source Express.js Webhook Testing tool with a Next.js frontend.

---

## 1. Overview

The **Webhook Tester** is a self-hostable API tool that allows developers to generate unique webhook endpoints and inspect incoming HTTP requests. It captures data such as method, headers, body, timestamp, and query parameters. The frontend dashboard is built with Next.js for viewing logs in real-time. This is useful for anyone working with webhooks or debugging API requests.

---

## 2. Use Cases

* Testing Stripe, GitHub, Discord, PayPal, and other webhooks
* Debugging any incoming HTTP payload
* Inspecting headers, methods, and body formats
* Teaching or demonstrating how webhooks work
* Building internal API debugging tools

---

## 3. MVP Features

### 3.1 Create a Webhook Endpoint

* Route: `POST /create`
* Generates a unique ID
* Returns a URL such as `/hook/:id`

### 3.2 Capture Incoming Requests

* Route: `ALL /hook/:id`
* Captures:

  * HTTP method
  * Headers
  * Body (JSON, text, form)
  * Query parameters
  * Timestamp
  * IP address
* Stores data in memory for MVP

### 3.3 Retrieve Logs

* Route: `GET /:id`
* Returns all captured requests for the given ID

---

## 4. Future Features (Post-MVP)

* File or database storage
* Log expiration (auto-clean)
* Configurable responses for webhook endpoints
* Next.js frontend dashboard to view logs visually
* WebSockets for real-time request monitoring
* Shareable public bins
* Authentication for private logs
* Docker support

---

## 5. Project Structure

```
webhook-tester/
│
├── backend/                  # Express backend
│   ├── src/
│   │   ├── app.ts            # Core Express setup
│   │   ├── routes/
│   │   │   ├── create.ts
│   │   │   ├── hook.ts
│   │   │   └── logs.ts
│   │   ├── utils/
│   │   │   ├── idGen.ts
│   │   │   └── storage.ts
│   │   └── middleware/
│   │       └── bodyParser.ts
│   └── server.ts             # Entry point
│
├── frontend/                 # Next.js frontend
│   ├── app/
│   │   ├── page.tsx          # Dashboard home
│   │   └── logs/[id]/
│   │       └── page.tsx      # Logs view page
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── EndpointCard.tsx
│   │   ├── LogViewer.tsx
│   │   └── LogEntry.tsx
│   ├── public/
│   └── styles/
│
├── package.json              # Optionally root-level scripts
└── README.md
```

---

## 6. API Specification

### 6.1 POST /create

**Description:** Generates a unique webhook endpoint.
**Response Example:**

```json
{
  "id": "b7f3da",
  "url": "https://yourserver.com/hook/b7f3da"
}
```

### 6.2 ALL /hook/:id

**Description:** Captures incoming requests and logs them.

### 6.3 GET /:id

**Description:** Returns all captured logs.
**Response Example:**

```json
{
  "id": "b7f3da",
  "logs": [
    {
      "method": "POST",
      "headers": {},
      "body": {},
      "query": {},
      "timestamp": 1712432112,
      "ip": "127.0.0.1"
    }
  ]
}
```

---

## 7. Storage Model

### In-Memory (MVP)

```js
{
  "id": [
    {
      method,
      headers,
      body,
      query,
      timestamp,
      ip
    }
  ]
}
```

### Upgrade Options

* JSON file-based
* SQLite
* MongoDB
* Redis (for expiring logs)

---

## 8. Setup Instructions

### Install dependencies

```
npm install express cors
npm install --save-dev @types/express @types/cors @types/node ts-node typescript
```

### Run the server

```
npx ts-node src/server.ts
```

Server will start on the configured port (default: 5000). Next.js frontend runs on default port 3000.

---

## 9. Roadmap

### Phase 1 (MVP) ✅

* Create endpoint
* Log incoming requests
* Retrieve logs
* In-memory storage

### Phase 2

* Persistent storage
* Expiration logic
* Response customization
* Next.js frontend UI

### Phase 3

* Full Next.js dashboard
* WebSockets live updates
* Authentication
* Docker container support

### Phase 4 — CLI Tool

* Publish as an npm package (`npm install -g webhook-tester`)
* Single command to start both backend and frontend (`webhook-tester start`)
* Auto-generates a first endpoint on startup
* Opens browser dashboard automatically
* Clean terminal output showing the webhook URL ready to use
* Optional flags:
  * `--port` to set a custom backend port
  * `--no-open` to skip auto-opening the browser
  * `--endpoint` to auto-create an endpoint on start

---

## 10. Contribution Guidelines

* Fork the repository
* Use feature branches
* Submit PRs with clear descriptions
* Maintain code style and formatting

---

## 11. License

MIT License

---

This document serves as the full functional and structural reference for the Webhook Tester project with Express backend and Next.js frontend.