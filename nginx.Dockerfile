FROM nginx:latest
LABEL MAINTAINER="Tai Nguyen<tainv@its-global.vn>"

COPY nginx.conf /etc/nginx/site-avaiable/

RUN sed -i "s/__NGINX_DOMAIN__/${NGINX_DOMAIN}/" /etc/nginx/site-avaiable/nginx.conf

CMD [ "nginx-debug", "-g", "daemon off;"]