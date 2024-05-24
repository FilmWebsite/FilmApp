FROM node:20

WORKDIR /usr/local/app

COPY package*.json ./

# Update npm, Install pnpm, Set PNPM_HOME, Install global packages
RUN npm i -g npm@latest && \
    npm install -g pnpm && \
    pnpm --version

RUN pnpm install

COPY . .

EXPOSE 3002

CMD ["pnpm", "dev"]
