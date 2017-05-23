FROM node:6.10.3

# Location of output files
VOLUME /output

# Bind to host (used to capture volumes)
VOLUME /host

# cache npm install
ADD ./package.json /app/package.json
WORKDIR /app

RUN npm install --production

ADD . /app

ENTRYPOINT ["node", "cli.js"]

CMD ["--all", "--outpath", "/output", "--root-path", "/host"]
