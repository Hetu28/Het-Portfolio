# Operations Runbook: Backup, Restoration & Rollback Procedures

This runbook documents operational procedures, backup policies, restoration verification, rollback playbooks, and incident response procedures for the Het Patel Portfolio backend and database.

---

## 1. Monitoring & Health Verification

The backend exposes health check endpoints designed for external uptime monitors (e.g., BetterStack, UptimeRobot, Render Health Check):

- **Health Endpoint**: `GET /api/health` (also aliased at `/health` and `/api/v1/health`)
- **Probe Interval**: Every 30 to 60 seconds
- **Healthy Response**:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-10-24T18:30:00.000Z",
    "services": {
      "api": "healthy",
      "database": "connected"
    }
  }
  ```
- **Unhealthy Condition**: If the database is disconnected or unreachable, the probe returns `HTTP 503 Service Unavailable`:
  ```json
  {
    "status": "error",
    "timestamp": "2026-10-24T18:30:00.000Z",
    "services": {
      "api": "healthy",
      "database": "disconnected"
    },
    "error": "Database connectivity failed"
  }
  ```

---

## 2. Database Backup Policy & Procedures

### Recommended Backup Cadence
| Level | Mechanism | Frequency | Retention |
| :--- | :--- | :--- | :--- |
| **Automated Cloud Backup** | Managed PostgreSQL Provider (Supabase / Render / Neon PITR) | Daily automated snapshots + WAL continuous archiving | 7 to 30 days |
| **Application Level Snapshot** | `npm run db:backup` (JSON table export / SQLite snapshot) | Before major releases or schema migrations | Indefinite (stored in secured S3 / encrypted backup store) |

### Executing a Backup Manually
Run the automated backup utility from the `server/` directory:
```bash
cd server
npm run db:backup
```
- **When using SQLite**: Creates a byte-identical binary copy in `server/backups/backup_sqlite_<timestamp>.db`.
- **When using PostgreSQL**: Executes an atomic transaction snapshot across all relational tables (`Inquiry`, `Project`, `TechnicalSpecs`, `ProjectStill`, `FilmographyGroup`, `ContributionFilm`, `FAQ`, `SiteSetting`), redacting database credentials, and saves to `server/backups/backup_snapshot_<timestamp>.json`.

---

## 3. Database Restoration & Verification Procedure

In the event of accidental data corruption, failed deployment, or disaster recovery, follow this restoration procedure:

### Step 1: Run the Restoration Utility
To restore the most recent backup automatically:
```bash
cd server
npm run db:restore
```

To restore a specific backup snapshot:
```bash
cd server
npx tsx scripts/restore_database.ts backups/backup_snapshot_2026-10-24T13-33-30-688Z.json
```

### Step 2: Verification of Restored Data
Run the database test suite to verify table integrity and foreign keys:
```bash
npm run test:db
```
Verify that:
1. All client enquiries exist with their original timestamps and statuses (`UNREAD`/`READ`).
2. Portfolio projects, stills, and technical specs match production data.
3. Cinema seats and filmography credits are intact.

---

## 4. Rollback Procedures

### Scenario A: Backend Code Rollback
If a newly deployed backend version introduces unexpected runtime errors or instability:

1. **On Render**:
   - Go to **Render Dashboard > Het-Portfolio-API > Deploys**.
   - Locate the previous successful deploy.
   - Click the options menu and select **Rollback to this deploy**.
   - Rollback completes in ~30 seconds.
2. **On Railway**:
   - Go to **Railway Dashboard > Deployments**.
   - Click the previous working commit deployment > **Redeploy**.
3. **On Docker**:
   - Point your container orchestrator back to the previous image tag:
     ```bash
     docker stop het-portfolio-api
     docker run -d -p 5000:5000 --env-file .env het-portfolio-api:<previous-tag>
     ```

### Scenario B: Frontend Rollback on Vercel
If frontend changes or an updated `NEXT_PUBLIC_API_URL` need immediate reversal:
1. Open the [Vercel Dashboard](https://vercel.com).
2. Select the `het-portfolio` project > **Deployments**.
3. Identify the last known good deployment.
4. Click the three dots `...` on that deployment and select **Instant Rollback**.
5. Traffic is immediately redirected to the previous build with zero downtime.

### Scenario C: Database Schema Rollback
If a new migration causes query failures or unexpected side effects:
1. Revert to the previous database backup:
   ```bash
   cd server
   npm run db:restore <path-to-pre-migration-backup>
   ```
2. In Git, revert the commit containing the faulty migration:
   ```bash
   git revert <commit-hash>
   ```
3. Redeploy the application so Prisma aligns with the reverted schema.

---

## 5. Security Incident Response Playbook

### Incident 1: Compromised `ADMIN_API_KEY`
1. Immediately generate a new 32+ character random secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Update `ADMIN_API_KEY` in the cloud hosting provider's environment variables.
3. Restart the backend service. All old bearer tokens are invalidated instantly.

### Incident 2: CORS Unauthorized Origin Flooding
If unauthorized third-party domains attempt to query the API:
- The backend's strict CORS middleware blocks them at the HTTP level with `403 Forbidden` (`code: "CORS_FORBIDDEN"`).
- The attempt is logged with IP address and timestamp in structured request logs.
- No database queries or application logic are executed for blocked CORS requests.

### Incident 3: Form Abuse or Denial-of-Service
- The `/api/v1/enquiries` endpoint enforces strict rate limiting (max 5 requests per 15 minutes per IP).
- Requests exceeding this threshold receive `429 Too Many Requests`.
- Request bodies larger than 10KB are rejected immediately with `413 Payload Too Large`.
- Malformed inputs, missing headers, or non-JSON payloads are rejected with `400 Bad Request` or `415 Unsupported Media Type`.
