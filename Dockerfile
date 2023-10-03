FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY ./ .
RUN yarn build

FROM nginx:alpine as production
RUN mkdir /app
COPY --from=build /app/dist /app
COPY .conf/nginx.conf /etc/nginx/nginx.conf

HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget --spider http://localhost || exit 1