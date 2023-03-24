# Dockerfile for the FRONT (React) container

FROM node:12.16.1-alpine3.9 AS builder

WORKDIR /usr/src/app

# Build the app

COPY --chown=node:node package*.json ./
RUN npm ci

# # pass env variables to the app
# ## BACKEND access
# ENV REACT_APP_BACKEND_URL=<REACT_APP_BACKEND_URL>
# ENV REACT_APP_BACKEND_PORT=<REACT_APP_BACKEND_PORT>

# ## keycloak
# ENV REACT_APP_KEYCLOAK_URL=<REACT_APP_KEYCLOAK_URL>
# ENV REACT_APP_KEYCLOAK_PORT=<REACT_APP_KEYCLOAK_PORT>
# ENV REACT_APP_KEYCLOAK_REALM=<REACT_APP_KEYCLOAK_REALM>
# ENV REACT_APP_KEYCLOAK_CLIENT_ID=<REACT_APP_KEYCLOAK_CLIENT_ID>

# ## minio
# ENV REACT_APP_MINIO_URL=<REACT_APP_MINIO_URL>
# ENV REACT_APP_MINIO_PORT=<REACT_APP_MINIO_PORT>

# Build the app
COPY --chown=node:node . .
RUN npm run build

# Run the app for production
FROM nginx:1.17.9-alpine AS runner

# Copy build files
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Expose port
EXPOSE 80

# Run app
CMD ["nginx", "-g", "daemon off;"]
