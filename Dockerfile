FROM node:22.2-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

COPY .env .env

RUN npm install sharp

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]