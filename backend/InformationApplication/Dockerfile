FROM adoptopenjdk/openjdk11:x86_64-alpine-jdk-11.0.14.1_1-slim
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} InformationApplication-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/InformationApplication-0.0.1-SNAPSHOT.jar"]
