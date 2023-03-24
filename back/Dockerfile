# BACKEND 

## App is an express server with typescript
## it uses prisma to connect to the database

## Prisma need to generate the client and push the schema to the database

## express server is listening on port 3000

# Build the app

FROM node:12.16.1-alpine3.9 as builder

WORKDIR /usr/src/app

# Set environment variables
ENV NODE_ENV="production"

# Install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci

# Copy source files
COPY --chown=node:node . .

# Set environment variables

# ## DB
# ENV DATABASE_URL=<DATABASE_URL>
# ENV DATABASE_PORT=<DATABASE_PORT>
# ENV DATABASE_NAME=<DATABASE_NAME>
# ENV DATABASE_USER=<DATABASE_USER>
# ENV DATABASE_PASSWORD=<DATABASE_PASSWORD>

# ## AUTH (keycloak)
# ENV KEYCLOAK_ENDPOINT=<KEYCLOAK_ENDPOINT>
# ENV KEYCLOAK_PORT=<KEYCLOAK_PORT>
# ENV KEYCLOAK_REALM=<KEYCLOAK_REALM>
# ENV KEYCLOAK_CLIENT_ID=<KEYCLOAK_CLIENT_ID>
# ENV KEYCLOAK_CLIENT_SECRET=<KEYCLOAK_CLIENT_SECRET>

# ## STORAGE (minio)
# ENV MINIO_ENDPOINT=<MINIO_ENDPOINT>
# ENV MINIO_PORT=<MINIO_PORT>
# ENV MINIO_ACCESS_KEY=<MINIO_ACCESS_KEY>
# ENV MINIO_SECRET_KEY=<MINIO_SECRET_KEY>
# ENV MINIO_PORT_ACCESS=<MINIO_PORT_ACCESS>


# Generate prisma client
RUN npm run prisma:generate

# Push prisma schema to database
RUN npm run prisma:push

# Build app
RUN npm run build

# Run the app
FROM node:12.16.1-alpine3.9 as runner

WORKDIR /usr/src/app

# Set environment variables
ENV NODE_ENV="production"

# Install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci --only=production

# Copy build files
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

# Run app
CMD ["npm", "start:prod"]
