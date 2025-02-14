# Use official Node.js image as the base
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project (excluding files from .dockerignore)
COPY . .

# Set environment variables (optional, can also be provided at runtime)
ENV NODE_ENV=production

# Run tests using Mocha with Allure reporting
CMD ["npm", "test"]
