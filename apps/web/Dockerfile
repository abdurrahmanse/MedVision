FROM node:20-alpine AS base
WORKDIR /app
COPY package.json ./
RUN npm install -g pnpm@9.0.0 && pnpm i
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm run build
CMD ["pnpm", "start"]
EXPOSE 3000
