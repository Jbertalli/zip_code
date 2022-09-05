FROM node:16-alpine

RUN mkdir -p /usr/app/

WORKDIR /usr/app

COPY ./ ./

RUN npm install

RUN npm run build

EXPOSE 3050

CMD ["npm", "start"]
