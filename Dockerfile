FROM node:4.2.2

# cache npm install
ADD ./package.json /app/package.json
WORKDIR /app

RUN npm install

ADD . /app

CMD npm start
