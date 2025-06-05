# Usamos Amazon Corretto 17 como imágen base (incluye el SDK JDK)
FROM amazoncorretto:17

# Configuramos el directorio inicial de nuestra app
WORKDIR /app

# Copiamos los distribuibles
COPY target/*.jar app.jar

# Exponemos el puerto 8080
EXPOSE 8080

# Command to run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]