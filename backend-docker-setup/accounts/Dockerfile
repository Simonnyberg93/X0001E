FROM adoptopenjdk/openjdk11:x86_64-alpine-jdk-11.0.14.1_1-slim
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} UserApplication-0.0.1-SNAPSHOT.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","/UserApplication-0.0.1-SNAPSHOT.jar"]
