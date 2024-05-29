FROM node:20

WORKDIR /usr/local/app

# Copy the entire monorepo
COPY . .

# Update npm, Install pnpm, Set PNPM_HOME, Install global packages
RUN npm i -g npm@latest && \
    npm install -g nodemon && \
    npm i ts-node -D && \
    npm install -g pnpm && \
    pnpm --version

# Set PNPM_HOME
ENV PNPM_HOME="/usr/local/app/node_modules/.bin"
ENV PATH=$PNPM_HOME:$PATH

# Install project dependencies
RUN pnpm install

WORKDIR /usr/local/app/apps/backend

# Set environment variables
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start the application
CMD ["pnpm", "dev"]
