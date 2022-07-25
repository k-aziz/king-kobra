FROM node:16

WORKDIR /app

ENV NODE_ENV production

COPY . .

RUN npm install

EXPOSE 8080
CMD ["npm", "start"]

