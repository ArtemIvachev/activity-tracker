FROM gradle:8.1.1-jdk17 as builder

WORKDIR /backend
COPY . /backend/
RUN gradle build -x test

FROM openjdk:21-ea-17-jdk-slim as runner
RUN mkdir /opt/app
COPY --from=builder /backend/build/libs/backend-0.0.1-SNAPSHOT.jar /opt/app/backend-0.0.1-SNAPSHOT.jar
CMD ["java", "-jar", "/opt/app/backend-0.0.1-SNAPSHOT.jar"]

EXPOSE 8080/tcp
