FROM node:17 AS builder

RUN echo $DATABASE_URL

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:17

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE $PORT
CMD [ "npm", "run", "start:prod" ]
