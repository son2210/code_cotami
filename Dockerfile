FROM registry.gitlab.com/its-global/cotami/cotami-admin/base as build

LABEL MAINTAINER="Tai Nguyen<tainv@its-global.vn>"
ARG BUILD_COMMAND

ENV GENERATE_SOURCEMAP false
ENV NODE_ENV production
ENV INSTALL_PATH=/home/cotami-admin

WORKDIR $INSTALL_PATH

ADD package.json $INSTALL_PATH
ADD yarn.lock $INSTALL_PATH

RUN cd $INSTALL_PATH && \
  yarn install

COPY . .

RUN ls $INSTALL_PATH

RUN yarn $BUILD_COMMAND

EXPOSE 5050

CMD [ "npm", "run", "server"]