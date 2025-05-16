# Usamos Amazon Corretto 21 como imágen base (incluye el SDK JDK)
FROM amazoncorretto:21

# Set working directory inside the container
WORKDIR /app

# Copy your Spring Boot JAR into the container
COPY target/my-springboot-app.jar app.jar

# Expose the port your app listens on (default Spring Boot port)
EXPOSE 8080

# Command to run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]