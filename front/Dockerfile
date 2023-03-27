# Dockerfile for the FRONT (React) container

FROM node:19-alpine AS builder

WORKDIR /app

# Build the app
COPY --chown=node:node package*.json ./
RUN npm ci

# Build the app
COPY --chown=node:node . .
RUN npm run build

# Run the app for production
FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# Copy build files
COPY --from=builder /app/build .

# Expose port
EXPOSE 80

# Run app
CMD ["nginx", "-g", "daemon off;"]
