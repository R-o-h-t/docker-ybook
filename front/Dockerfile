# Dockerfile for the FRONT (React) container

FROM node:19-alpine AS builder

WORKDIR /usr/src/app

RUN npm install -g react-scripts

# Build the app
COPY --chown=node:node package*.json ./
RUN npm ci

# Build the app
COPY --chown=node:node . .
RUN npm run build

# Run the app for production
FROM nginx:alpine AS runner

# Copy build files
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run app
CMD ["nginx", "-g", "daemon off;"]
