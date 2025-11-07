# Sử dụng Bun chính thức từ GitHub Container Registry
FROM oven/bun:latest

WORKDIR /app

# Copy package.json & bun.lockb (nếu có)
COPY package.json bun.lockb* ./

# Cài dependencies với Bun
RUN bun install --production

# Copy toàn bộ source code
COPY . .

# Cấu hình port
ENV PORT=3000
EXPOSE 3000

# Chạy app bằng Bun
CMD ["bun", "run", "dev"]
