FROM node:14 as build
ARG GIT_COMMIT
ENV GIT_COMMIT ${GIT_COMMIT}
LABEL git-commit=$GIT_COMMIT
ENV NODE_ENV=dev \
    NPM_CONFIG_PREFIX=/home/node/.npm-global \
    PATH=$PATH:/home/node/.npm-global/bin:/home/node/node_modules/.bin:$PATH
RUN mkdir -p /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app
USER node
WORKDIR /usr/src/app
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
RUN npm i -g @nestjs/cli
RUN npm i
COPY --chown=node:node . ./
RUN npm run build
RUN chmod +x entrypoint.sh
RUN mkdir /usr/src/app/config
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
