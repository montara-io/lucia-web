# Stage 0, "build"
FROM node:14 as build
ARG GITLAB_ACCESS_TOKEN
ARG GIT_COMMIT
ENV GIT_COMMIT ${GIT_COMMIT}
LABEL git-commit=$GIT_COMMIT
WORKDIR /app
RUN echo //gitlab.com/api/v4/projects/25331249/packages/npm/:_authToken=${GITLAB_ACCESS_TOKEN} > .npmrc
RUN echo //gitlab.com/api/v4/packages/npm/:_authToken=${GITLAB_ACCESS_TOKEN} >> .npmrc
RUN echo @montara:registry=https://gitlab.com/api/v4/projects/25331249/packages/npm/ >> .npmrc
COPY  package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# -- RELEASE --
FROM nginx:stable-alpine as release

COPY --from=build /app/build /usr/share/nginx/html
# copy .env.example as .env to the relase build
COPY --from=build /app/.env /usr/share/nginx/html/.env
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN apk add --update nodejs
RUN apk add --update npm
RUN npm i -g runtime-env-cra@0.2.0

WORKDIR /usr/share/nginx/html

EXPOSE 80
CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]
