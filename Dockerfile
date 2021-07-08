FROM node:12.20.0 AS cotami-build

LABEL MAINTAINER="Tai Nguyen<tainv@its-global.vn>"
ARG build_command

ENV INSTALL_PATH=/home/cotami-admin
ENV GENERATE_SOURCEMAP false
ENV NODE_ENV production

WORKDIR $INSTALL_PATH

COPY package.json yarn.lock ./
ENV PATH $INSTALL_PATH/node_modules/.bin:$PATH
RUN yarn install

COPY . ./

FROM cotami-build

WORKDIR $INSTALL_PATH

ADD package.json $INSTALL_PATH
ADD yarn.lock $INSTALL_PATH

RUN yarn $build_command
EXPOSE 5050

CMD [ "npm", "run", "server"]