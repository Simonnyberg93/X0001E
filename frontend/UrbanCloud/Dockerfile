FROM node:16.11.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/

RUN npm install
RUN npm install -g @angular/cli@14.0.5

EXPOSE 4200

CMD ng serve --disable-host-check
