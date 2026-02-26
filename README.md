# Xenlog404

> Catch every request. Miss nothing.

A self-hostable webhook testing and request inspection tool. Generate unique endpoints, fire requests at them, and inspect everything in real time — method, headers, body, query params, IP, and timestamp.

---

## 1. Overview

**Xenlog404** is an open-source tool that allows developers to generate unique webhook endpoints and inspect incoming HTTP requests in real time. Built with an Express.js backend and a Next.js frontend, it's useful for anyone working with webhooks or debugging API integrations.

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
* WebSockets for real-time request monitoring
* Shareable public bins
* Authentication for private logs
* Docker support

---

## 5. Project Structure

```
xenlog404/
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
│   └── webhook-tester-frontend/
│       ├── app/
│       │   ├── page.tsx          # Dashboard home
│       │   └── logs/[id]/
│       │       └── page.tsx      # Logs view page
│       └── components/
│           ├── Dashboard.tsx
│           ├── EndpointCard.tsx
│           ├── LogViewer.tsx
│           └── LogEntry.tsx
│
├── package.json              # Root scripts to run both servers
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

### 1. Clone the repository

```bash
git clone https://github.com/your-username/xenlog404.git
cd xenlog404
```

### 2. Install all dependencies

```bash
npm run install:all
```

This installs dependencies for the root, backend, and frontend in one command.

### 3. Start both servers

```bash
npm run dev
```

This starts both servers concurrently — no need to navigate into separate folders:
- Backend running at `http://localhost:5000`
- Frontend running at `http://localhost:3000`

---

## 9. How to Use

### Step 1 — Open the dashboard
Go to `http://localhost:3000` in your browser.

### Step 2 — Create a webhook endpoint
Click **"+ Create New Endpoint"**. You'll get back a unique URL like:
```
http://localhost:5000/hook/fa0b4c
```

### Step 3 — Send requests to your endpoint
Point any service (Stripe, GitHub, Discord, etc.) at your webhook URL, or test it manually:
```bash
curl -X POST http://localhost:5000/hook/fa0b4c \
  -H "Content-Type: application/json" \
  -d '{"event": "payment.success", "amount": 100}'
```

### Step 4 — Inspect the logs
Click **"View Logs"** on your endpoint card to see all captured requests in real time — including method, headers, body, query params, timestamp, and IP address.

---

> **Note:** When running locally, `localhost:5000` is only accessible on your machine. To receive webhooks from external services like Stripe or GitHub, either deploy the backend publicly or use a tunneling tool like [ngrok](https://ngrok.com) to expose your local server.

---

## 10. Roadmap

### Phase 1 (MVP) ✅

* Create endpoint
* Log incoming requests
* Retrieve logs
* In-memory storage

### Phase 2

* Persistent storage
* Expiration logic
* Response customization

### Phase 3

* WebSockets live updates
* Authentication
* Docker container support

### Phase 4 — CLI Tool

* Publish as an npm package (`npm install -g xenlog404`)
* Single command to start both servers (`xenlog404 start`)
* Auto-generates a first endpoint on startup
* Opens browser dashboard automatically
* Clean terminal output showing the webhook URL ready to use
* Optional flags:
  * `--port` to set a custom backend port
  * `--no-open` to skip auto-opening the browser
  * `--endpoint` to auto-create an endpoint on start

---

## 11. Contribution Guidelines

* Fork the repository
* Use feature branches
* Submit PRs with clear descriptions
* Maintain code style and formatting

---

## 12. License

MIT License

---

Built by [XENON-PROJECTS](https://github.com/your-username)