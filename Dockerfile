# Use official Node.js LTS (Long Term Support) version as base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
# 'npm ci' is preferred for production builds as it's faster and stricter than 'npm install'
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define environment variable for production
ENV NODE_ENV=production

# Start the application
CMD ["npm", "run", "serve"]
