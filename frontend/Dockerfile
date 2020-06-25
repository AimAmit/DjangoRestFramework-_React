FROM node:14-alpine as build
WORKDIR /app
# ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
# COPY package-lock.json ./

RUN apk add --no-cache --virtual .build-deps make gcc g++ python \
    && npm install --production --silent \
    && apk del .build-deps

# RUN npm ci
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/
RUN adduser -D user
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]