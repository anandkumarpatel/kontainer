FROM node:4.2.2

# Location of output files
VOLUME /output

# Bind to host (used to capture volumes)
VOLUME /host

# cache npm install
ADD ./package.json /app/package.json
WORKDIR /app

RUN npm install

ADD . /app

CMD node cli.js --all --outpath /output --root-path /host
