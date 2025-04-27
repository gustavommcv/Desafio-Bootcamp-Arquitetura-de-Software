FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm install -g tsx

EXPOSE 3000

CMD ["tsx", "watch", "src/main.ts"]