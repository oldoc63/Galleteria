# Use the official Node.js 20 LTS image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Create a directory for data persistence
RUN mkdir -p /app/data

# Copy db.json to the data directory if it exists, otherwise create an empty one
RUN if [ -f db.json ]; then cp db.json /app/data/; else echo '{"pedidos":[]}' > /app/data/db.json; fi

# Create a symbolic link to use the persistent data directory
RUN rm -f db.json && ln -s /app/data/db.json db.json

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S galleteria -u 1001

# Change ownership of the app directory to the nodejs user
RUN chown -R galleteria:nodejs /app

# Switch to the non-root user
USER galleteria

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "http.get('http://localhost:3000/api/obtener-pedidos', (res) => { \
    process.exit(res.statusCode === 200 ? 0 : 1) \
  }).on('error', () => process.exit(1))"

# Start the application
CMD ["npm", "start"]