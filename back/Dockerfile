# BACKEND 

## App is an express server with typescript
## it uses prisma to connect to the database

## Prisma need to generate the client and push the schema to the database

## express server is listening on port 3000

# Build the app
FROM node:19-alpine as builder

WORKDIR /usr/src/app

# Install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci

# Copy source files
COPY --chown=node:node . .

# Generate prisma client
RUN npm run prisma:generate

# Build app
RUN npm run build

# Run the app
FROM node:19-alpine as runner

WORKDIR /usr/src/app

# Set environment variables
ENV NODE_ENV="production"

# Install dependencies
COPY --chown=node:node package*.json ./
RUN npm ci

# Copy build files
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

#Copy prisma schema
COPY --chown=node:node --from=builder /usr/src/app/prisma/schema.prisma ./prisma/schema.prisma

# Run app
CMD ["npm", "run", "start:prod"]