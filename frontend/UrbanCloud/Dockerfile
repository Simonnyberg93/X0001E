FROM node:16.11.0

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN npm install 
#--save-dev @angular-devkit/build-angular
#RUN npm install -g @angular/cli@14.0.5

COPY . /usr/src/app

CMD ng serve --host 0.0.0.0 --port 4200