# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json tsconfig.json ./
COPY prisma ./prisma/

# Install dependencies including dev dependencies
RUN npm ci

# Copy source code
COPY src ./src/

# Generate Prisma client and compile TypeScript
RUN npx prisma generate
RUN npm run build

# Stage 2: Production Runtime
FROM node:20-alpine AS runner

WORKDIR /app

# Security: Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Install runtime utilities (curl for healthcheck)
RUN apk add --no-cache curl

# Copy package files and install only production dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci --only=production

# Copy compiled JavaScript from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Create non-root user and assign permissions
RUN chown -R node:node /app
USER node

# Expose server port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/api/health || exit 1

# Start production server
CMD ["node", "dist/server.js"]
