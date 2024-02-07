# syntax=docker/dockerfile:1

# Use a specific version of node based on the ARG value
ARG NODE_VERSION=18.16.0
FROM node:${NODE_VERSION}-alpine

# Set a specific working directory for your application
WORKDIR /app

# Install server dependencies
COPY package*.json ./
RUN npm install

# Install client dependencies
COPY client/package*.json ./client/
RUN npm --prefix ./client install --fetch-timeout=300000

# Copy the rest of your app's source code into the working directory
COPY . .

# Change ownership of the application directory to the 'node' user
RUN chown -R node:node /app

# Set environment variable to production
ENV NODE_ENV production

# Expose the port your app runs on
EXPOSE 3001

# Switch to the non-root user 'node' for running the application
USER node

# Command to run your app
CMD ["npm", "start"]