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
- NodeJS - [NodeJS](https://nodejs.org/en/)

1. clone the repo

```
git clone https://github.com/Simonnyberg93/X0001E.git
```

2. Start the docker images for the backend: move to `backend-docker-setup` folder, and open terminal.
Enter:
```
docker-compose up
```

3. Wait a few minutes to let all services start and for the database to be loaded.

4. Install search indexes for database: In your browser go to `http://localhost:7474/browser`. Run the commmands:

```cypher
CREATE FULLTEXT INDEX titlesAndDescriptions IF NOT EXISTS FOR (n:Actor|Area|Document|Permission) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX actorSearch IF NOT EXISTS FOR (n:Actor) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX areaSearch IF NOT EXISTS FOR (n:Area) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX documentSearch IF NOT EXISTS FOR (n:Document) ON EACH [n.title, n.description];
CREATE FULLTEXT INDEX permissionSearch IF NOT EXISTS FOR (n:Permission) ON EACH [n.title, n.description];
```


5. (`Soon as docker container aswell`) Start the frontend application, Open a new terminal, go to `/frontend/urbancloud`. Run commands:

```
npm install
npm run start
```

6. The application should now be up and running on `http://localhost:4200`

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
