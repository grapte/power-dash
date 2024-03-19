FROM node:21-alpine

# Create the mystack directory
RUN mkdir /mystack

# Install PocketBase binaries
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.22.4/pocketbase_0.22.4_linux_amd64.zip \
    && unzip pocketbase_0.22.4_linux_amd64.zip -d /mystack/ \
    && rm pocketbase_0.22.4_linux_amd64.zip

# Create the pb_public directory
RUN mkdir /mystack/pb_public

# Install Caddy binaries
RUN wget https://github.com/caddyserver/caddy/releases/download/v2.7.6/caddy_2.7.6_linux_amd64.tar.gz \
    && tar -xzf caddy_2.7.6_linux_amd64.tar.gz -C /mystack/ \
    && rm caddy_2.7.6_linux_amd64.tar.gz

# Copy a minimal Caddy config
COPY Caddyfile /mystack/Caddyfile

# Copy database migrations
COPY database/pb_migrations /mystack/pb_migrations

# Copy frontend distribution files to /mystack/frontend
COPY frontend/dist /mystack/frontend

# Copy the backend folder
COPY backend /mystack/backend

# Start the stack (Caddy, PocketBase, backend)
CMD ["/bin/sh", "-c", "/mystack/caddy run --config /mystack/Caddyfile --adapter caddyfile & /mystack/pocketbase serve & node /mystack/backend/main.js"]
