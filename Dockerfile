FROM node:8

MAINTAINER phuhv <phuhv.56@gmail.com>

#RUN apt-get update -qq && apt-get -y install build-essential && apt-get -y install libssl-dev
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]