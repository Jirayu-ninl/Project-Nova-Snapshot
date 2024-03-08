# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION} as build

LABEL fly_launch_runtime="NestJS"

# NestJS app lives here
WORKDIR /app
# Install node modules
COPY package.json ./
RUN npm install
# Copy application code
COPY . .
# Generate prisma schema
RUN npx prisma generate --accelerate
RUN npx prisma db push
# Build application
RUN npm run build

FROM node:${NODE_VERSION}-slim
# Update
RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
# NestJS app lives here
WORKDIR /app
# Copy application code
COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/package-lock.json .
RUN npm install --omit=dev
COPY --chown=node:node --from=build /app/node_modules/.prisma/client  ./node_modules/.prisma/client
# Set production environment
ENV NODE_ENV=production
# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "dumb-init", "node", "dist/main" ]