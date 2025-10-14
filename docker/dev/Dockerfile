# Use the official Node.js 18 image as the base
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy dependency manifests first (allows Docker to cache npm install step)
COPY package*.json ./

# Install node modules (use npm ci in CI for reproducible installs)
RUN npm i

# Copy application source into the image
COPY . .

# Document the port the app listens on
EXPOSE 5501

# Default command to run the app in development mode
CMD [ "npm", "run", "dev" ]
