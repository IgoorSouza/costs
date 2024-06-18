FROM node:20.13.1

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]