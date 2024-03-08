# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}


LABEL fly_launch_runtime="NestJS"

# NestJS app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Install node modules
COPY --link package.json ./
RUN npm install

# Copy application code
COPY --link . .

# Generate prisma schema
RUN npm run db:generate:acc
RUN npm run db:push

# Build application
RUN npm run build

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]