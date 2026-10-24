# Production Deployment Guide: Het Patel Portfolio Backend

This guide outlines the production deployment procedure for the **Node.js + Express.js backend** and **managed PostgreSQL database** for the Het Patel filmmaker portfolio website.

---

## 1. Hosting Architecture Overview

The system employs a decoupled, production-grade cloud architecture:

| Component | Technology | Recommended Production Platform | Status / Location |
| :--- | :--- | :--- | :--- |
| **Frontend** | Next.js 14, Tailwind CSS, Framer Motion | **Vercel** | Live: `https://het-portfolio-phi.vercel.app` |
| **Backend API** | Node.js 20, Express, TypeScript, Zod, Helmet | **Render** or **Railway** (or Docker container) | Production-ready in `server/` |
| **Database** | PostgreSQL 15+ (Prisma ORM) | **Managed PostgreSQL** (Supabase, Neon, Render Postgres, Railway Postgres) | Relational schema in `server/prisma/` |

> [!NOTE]
> The frontend is already hosted on Vercel. Because the backend is a persistent Express.js service maintaining stateful database connection pools and rate limiting, running the backend on a specialized Node.js runtime (e.g., Render Web Service, Railway, or Docker) with a dedicated PostgreSQL database is the recommended industry standard.

---

## 2. Production Environment Variables

### Frontend Variables (Vercel Project Settings)

Configure these in the Vercel Dashboard under **Project Settings > Environment Variables**:

| Variable Name | Required | Example Production Value | Purpose |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | **Yes** | `https://api.hetpatel.com` (or `https://het-portfolio-api.onrender.com`) | Public URL of the deployed Express backend. All client-side fetch calls and enquiry submissions route here. |

### Backend Variables (Render / Railway / Cloud Host)

Configure these in the backend platform's Environment Variables dashboard:

| Variable Name | Required | Example Production Value | Purpose |
| :--- | :---: | :--- | :--- |
| `NODE_ENV` | **Yes** | `production` | Enforces production mode, disables debug stack traces in error envelopes. |
| `PORT` | **Yes** | `5000` (or host-assigned `$PORT`) | Port the Express HTTP server listens on. |
| `CORS_ORIGIN` | **Yes** | `https://het-portfolio-phi.vercel.app` | Strict allowlist for frontend origin. Requests from unlisted origins receive `403 Forbidden`. |
| `API_PREFIX` | **Yes** | `/api/v1` | Base route prefix for public and protected APIs. |
| `REQUEST_SIZE_LIMIT` | **Yes** | `10kb` | Prevents Denial-of-Service and memory exhaustion from oversized payloads. |
| `DATABASE_URL` | **Yes** | `postgresql://user:password@host:5432/dbname?sslmode=require` | Secure connection string to managed PostgreSQL database. Must enforce SSL in production. |
| `ADMIN_API_KEY` | **Yes** | `32+ char cryptographically random secret` | Secret bearer key required for `/api/v1/admin/*` routes to inspect inquiries. |
| `TRUST_PROXY` | **Yes** | `1` | Enables Express to read `X-Forwarded-For` from reverse proxies (Cloudflare, Render, Railway) for accurate rate limiting. |

> [!CAUTION]
> Never commit `.env` or production secrets to Git. Always use `.env.production.example` as a template and provide real values directly in the cloud hosting provider's dashboard.

---

## 3. Database Setup & Non-Destructive Migrations

### A. Switch Prisma Provider for PostgreSQL
In the local workspace or during the deployment build process:
```bash
cd server
npm run db:provider:postgres
```
This updates `server/prisma/schema.prisma` to use `provider = "postgresql"` and regenerates the Prisma client.

### B. Controlled Migration Deployment
Never run `prisma db push`, `prisma migrate reset`, or `prisma migrate dev` on production. Those commands are destructive or prompt for interactive confirmation.

Run the non-destructive deployment command:
```bash
npm run prisma:deploy
```
*(Equivalent to `npx prisma migrate deploy`)*

This reads the checked-in migration history and applies pending SQL migrations in a single, atomic transaction without altering existing data.

### C. Initial Content Seeding (Safe & Non-Destructive)
To seed initial portfolio projects, filmography groups, cinema seat credits, FAQs, and brand collaborations:
```bash
npm run db:seed
```
The seed script is strictly idempotent using `upsert` queries. It **never modifies or deletes client inquiries**.

---

## 4. Platform Deployment Options

### Option A: Vercel (Preferred by User)
The Express backend is pre-configured to run seamlessly on Vercel as a serverless project using `server/vercel.json` and `server/api/index.ts`:

1. **Import the Repository in Vercel**:
   - In your [Vercel Dashboard](https://vercel.com), click **Add New... > Project**.
   - Select your GitHub repository: `Hetu28/Het-Portfolio`.
   - In the configuration screen, click **Edit** next to **Root Directory** and select `server`.
   - Framework Preset: select **Other**.
   - Build Command: `npx prisma generate && npm run build`
   - Output Directory: leave default or empty.

2. **Attach Vercel Postgres (Managed Database)**:
   - In the project dashboard, navigate to the **Storage** tab.
   - Click **Create Database > Postgres** (Vercel Postgres powered by Neon).
   - Click **Connect** to connect it to your backend project. Vercel automatically populates `DATABASE_URL` and `POSTGRES_PRISMA_URL`.

3. **Configure Environment Variables**:
   In **Project Settings > Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: `https://het-portfolio-phi.vercel.app`
   - `ADMIN_API_KEY`: `<generate-a-32-character-random-secret>`
   - `API_PREFIX`: `/api/v1`
   - `REQUEST_SIZE_LIMIT`: `10kb`
   - `TRUST_PROXY`: `1`

4. **Deploy & Apply Migrations**:
   - Click **Deploy**. Vercel will build and assign a domain (e.g., `https://het-portfolio-backend.vercel.app`).
   - Run the initial migration via the Vercel CLI (`vercel env pull` then `npm run prisma:deploy`) or via a one-time build script.

---

### Option B: Render (Blueprint)
The project includes a ready-to-deploy Render Blueprint at `server/render.yaml`:
1. In the Render Dashboard, click **New > Blueprint**.
2. Connect your GitHub repository: `Hetu28/Het-Portfolio`.
3. Render automatically provisions:
   - A managed PostgreSQL database (`het-portfolio-db`).
   - A Node.js web service running `npm install && npx prisma generate && npm run build`.
   - Starts with `npx prisma migrate deploy && node dist/server.js`.
   - Wires `DATABASE_URL` automatically between the database and the web service.
4. Set `CORS_ORIGIN=https://het-portfolio-phi.vercel.app` in the web service environment settings.

---

### Option C: Railway
The project includes a configuration file at `server/railway.json`:
1. In Railway, click **New Project > Provision PostgreSQL**.
2. Click **New Service > GitHub Repo > Het-Portfolio**, setting the root directory to `server`.
3. Railway automatically detects `railway.json`.
4. Add environment variables: `DATABASE_URL` (linked from Postgres plugin), `CORS_ORIGIN`, `NODE_ENV=production`.

---

### Option D: Docker Container Deployment
A hardened, multi-stage `server/Dockerfile` is provided:
```bash
docker build -t het-portfolio-api:latest server/
docker run -d \
  -p 5000:5000 \
  -e NODE_ENV=production \
  -e DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require" \
  -e CORS_ORIGIN="https://het-portfolio-phi.vercel.app" \
  -e ADMIN_API_KEY="your-secure-admin-api-key" \
  het-portfolio-api:latest
```

---

## 5. Connecting Frontend to Production Backend

Once the backend is live (e.g. `https://het-portfolio-api.onrender.com`):

1. Navigate to **Vercel Dashboard > Project Settings > Environment Variables**.
2. Add or update:
   ```
   NEXT_PUBLIC_API_URL = https://het-portfolio-api.onrender.com
   ```
3. Trigger a redeploy on Vercel:
   - Go to **Deployments**.
   - Click the three dots on the latest deployment and select **Redeploy**.

---

## 6. Verification and Acceptance Testing

Run these verification tests against the live production deployment:

### 1. Health Probe
```bash
curl -i https://<backend-domain>/api/health
```
**Expected Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "status": "ok",
  "timestamp": "2026-10-24T...",
  "services": {
    "api": "healthy",
    "database": "connected"
  }
}
```

### 2. Security Headers & HTTPS
Inspect the HTTP response headers:
```bash
curl -I https://<backend-domain>/api/v1/projects
```
Verify the following security headers are present:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security: max-age=...`
- `Content-Security-Policy`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 3. Strict CORS Enforcement
Test with an unauthorized origin:
```bash
curl -i -H "Origin: https://malicious-attacker.com" https://<backend-domain>/api/v1/projects
```
**Expected Response:** `HTTP/1.1 403 Forbidden` with `{ "code": "CORS_FORBIDDEN" }`.

### 4. Enquiry Form End-to-End Submission
1. Open the live frontend at `https://het-portfolio-phi.vercel.app/contact`.
2. Submit a valid enquiry:
   - **Name**: `Production Verification`
   - **Email**: `verify@hetpatel.com`
   - **Subject**: `Commercial Project`
   - **Message**: `Verifying live production submission and database persistence.`
3. Verify that the UI displays the green confirmation checkmark.
4. Verify persistence in the database using the private admin endpoint:
   ```bash
   curl -H "Authorization: Bearer <ADMIN_API_KEY>" https://<backend-domain>/api/v1/admin/enquiries
   ```
   The submitted record should appear with status `"UNREAD"`.
