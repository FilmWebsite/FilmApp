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

WORKDIR /usr/local/app/apps/backend

# Install dependencies
RUN pnpm install

ENV PORT=8080

EXPOSE 8080

CMD ["pnpm", "dev"]
