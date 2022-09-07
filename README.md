# Urban Cloud - Information platform towards the urban planning sector

## This project is licensed under the terms of the MIT license.

This project was a part of a master thesis project at Luleå university of technology, Sweden.

## Tech stack

- Frontend framework: [Angular](http://angular.io)
- Styling: [Angular Material](https://material.angular.io/)
- Databases: [Neo4J](https://neo4j.com/), [MySQL](https://www.mysql.com/).
- Backend APIs: [Spring Boot](https://spring.io/projects/spring-boot/)

## For local development

- Docker

## Getting Started

You have two options when running the application locally, either by using docker containers or not. In option 1 the docker setup is explained and option 2 without docker. Option 1 is highly recommended as it requires a lot less configurations.

## Option 1 - Docker

Requirements:

- Docker: [Docker - Get Started](https://www.docker.com/get-started/)
- nodejs: [NodeJS - Download](https://nodejs.org/en/dowload/)

1. Go to [NodeJS - Download](https://nodejs.org/en/dowload/), download and install recommended verison.

2. Go to [Docker - Get Started](https://www.docker.com/get-started/), install docker desktop.

If docker not working correctly or you get an error mentioning hyper-v. Open powershell, enter command:

```
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
```
Reboot pc.

5. clone the repo

```
git clone https://github.com/Simonnyberg93/X0001E.git
```

6. Start the docker images: move to `docker` folder, and open terminal.
   Enter:

```
docker-compose up
```

7. Wait a few minutes to let all services start and for the database to be loaded.

8. Install search indexes for database: In your browser go to `http://localhost:7474/browser`. Run the commmands:

```cypher
CREATE FULLTEXT INDEX titlesAndDescriptions IF NOT EXISTS FOR (n:Actor|Area|Document|Permission) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX actorSearch IF NOT EXISTS FOR (n:Actor) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX areaSearch IF NOT EXISTS FOR (n:Area) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX documentSearch IF NOT EXISTS FOR (n:Document) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX permissionSearch IF NOT EXISTS FOR (n:Permission) ON EACH [n.title, n.description];
```
9. Go to /frontend/UrbanCloud and open any terminal. Enter command:
```
npm install
```
10. After `npm install` is finished enter:
```
npm run start
```
11. The frontend application should now be up and running on `http://localhost:4200`. You can view the neo4j database from `http://localhost:7474/browser`.

## Option 2 - No docker TODO: this guide is not complete

Requirements:

- JDK 11: [Java Development Kit](https://www.oracle.com/se/java/technologies/javase/jdk11-archive-downloads.html)
- NodeJS - [NodeJS](https://nodejs.org/en/)
- MySQL - [MySQL Database](https://dev.mysql.com/downloads/installer/)
- Neo4J - [Neo4J Database](https://neo4j.com)

1. Make sure all requirements are installed.
2. Start your databases locally, for simplicity choose default ports.
3. To fill the information database with data see the README.MD in `database` folder.
4. Go to `/backend/UserApplication/src/main/resources/application.properties` and `/backend/InformationApplication/src/main/resources/application.properties`. Make sure the username and passwords matches your databases.
5. In your favourite Java IDE, start InformationApplication and UserApplication.
6. Go to `/frontend/urbancloud`.
7. Open terminal and enter commands:

```
npm install
npm run start
```

The application should now be up and running on `http://localhost:4200`
