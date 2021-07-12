FROM nginx:latest
LABEL MAINTAINER="Tai Nguyen<tainv@its-global.vn>"

ARG nginx_domain

COPY nginx.conf /etc/nginx/site-avaiable/
RUN sed -i "s/__NGINX_DOMAIN__/${nginx_domain}/" /etc/nginx/site-avaiable/nginx.conf

CMD [ "nginx-debug", "-g", "daemon off;"]