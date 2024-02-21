# Use a specific version of Node.js based on the ARG value, using the Alpine Linux version for a smaller image size
ARG NODE_VERSION=18.16.0
FROM --platform=linux/amd64 node:${NODE_VERSION}-alpine

# Set the working directory inside the Docker image for the application
WORKDIR /app

# Copy the package.json and package-lock.json for the server application
COPY package*.json ./

# Install the server dependencies defined in package.json
RUN npm install

# Copy the package.json and package-lock.json for the client application
COPY client/package*.json ./client/

# Install the client dependencies defined in the client's package.json
RUN npm --prefix ./client install --fetch-timeout=300000

# Copy the entire project into the /app directory inside the Docker image
COPY . .

# Debugging: List the contents of the /app/client directory to verify the structure
RUN ls -la /app/client

# Build the client application
RUN npm --prefix ./client run build

# Change the ownership of the /app directory and its contents to the 'node' user for security reasons
RUN chown -R node:node /app

# Set the environment variable to production to optimize the Node.js environment for production
ENV NODE_ENV production

# Expose port 3001 which the application uses
EXPOSE 3001

# Switch to the 'node' user to run the application (instead of using the root user)
USER node

# Define the command to run the application
CMD ["npm", "start"]
