FROM nginx:stable-alpine
RUN apk add --no-cache git
COPY . ./
COPY ./dist /var/www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 7003
ENTRYPOINT ["nginx","-g","daemon off;"]
