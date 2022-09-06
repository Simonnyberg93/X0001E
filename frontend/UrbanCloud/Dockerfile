FROM node:16.11.0

RUN mkdir /user/src/app
WORKDIR /usr/src/app

RUN npm install
RUN npm install -g @angular/cli@14.0.5

COPY . /usr/src/app/

CMD ng serve --port 4200
