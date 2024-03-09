# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION} as build

LABEL fly_launch_runtime="NOVA"

# NestJS app lives here
WORKDIR /app
# Install node modules
COPY package.json ./
RUN yarn
# Copy application code
COPY . .
# Generate prisma schema
RUN yarn db
# Build application
RUN yarn build

FROM node:${NODE_VERSION}-slim
# NestJS app lives here
WORKDIR /app
# Copy application code
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/package-lock.json .
RUN yarn
COPY --chown=node:node --from=build /app/node_modules/.prisma/client  ./node_modules/.prisma/client
# Set production environment
ENV NODE_ENV=production
ENV SERVER_PORT=3000
# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["yarn","start:prod"]