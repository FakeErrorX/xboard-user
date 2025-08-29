FROM node:20-alpine AS deps
WORKDIR ~/app

# Enable corepack and setup pnpm
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR ~/app

# Copy dependencies
COPY --from=deps ~/app/node_modules ./node_modules
COPY . .

# Enable corepack and setup pnpm
RUN corepack enable && corepack prepare pnpm@10.15.0 --activate
RUN pnpm run build

FROM nginx:stable-alpine AS runner
WORKDIR ~/app

# Copy dist
COPY --from=builder ~/app/dist /usr/share/nginx/html

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
