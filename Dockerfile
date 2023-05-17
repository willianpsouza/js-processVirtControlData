FROM node:19.9 as Builder

WORKDIR /app

COPY  package*.json .

RUN npm install \
&& npm install pm2 -g


FROM  Builder
WORKDIR /app
COPY --chown=node:node *.js ./
USER node
EXPOSE 3001
CMD ["pm2-runtime", "-i", "4" ,"main.js"]