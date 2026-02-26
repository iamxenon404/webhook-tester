
## Frontend README (Next.js)

```markdown
# Webhook Tester Frontend

This is the **Next.js frontend** for the Webhook Tester project. It provides a dashboard to create webhooks and view captured logs in a clean UI.

## Features

- Create new webhook endpoints
- View logs for each webhook in real-time
- Navigate between webhooks

## Requirements

- Node.js v16+
- npm

## Setup

1. Navigate to frontend folder:
```bash
cd webhook-tester/frontend
````

2. Install dependencies:

```bash
npm install
```

## Running the Frontend

```bash
npm run dev
```

Frontend will run on **[http://localhost:3000](http://localhost:3000)** by default.

## Usage

* Open the dashboard at `http://localhost:3000`
* Click **Create Webhook** to get a new URL
* Send requests to the URL using Postman or other tools
* Navigate to `/logs/[id]` to view the logs

## License

MIT License

```
```


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