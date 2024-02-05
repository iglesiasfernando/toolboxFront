FROM node:18-alpine
WORKDIR /reacttestapp/

COPY public/ /reacttestapp/public
COPY src/ /reacttestapp/src
COPY package.json /reacttestapp/

RUN npm install

CMD ["npm", "start"]

