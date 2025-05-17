#!/bin/bash

# Configura estas variables según tu entorno
AWS_REGION="<Colocar la región>"
AWS_ACCOUNT_ID="<Colocar el ID de la cuenta de AWS>"
REPO_NAME="<Colocar el nombre del Repositorio de imágenes en ECR>"
IMAGE_TAG="latest"

# Variables de entorno para tu contenedor
SPRING_DATASOURCE_URL="<Colocar la URL de su base de datos>"
SPRING_DATASOURCE_USERNAME="<Colocar el usuario de su usuario administrador>"
SPRING_DATASOURCE_PASSWORD="<Colocar el password>"

echo "Autenticando en ECR..."
aws ecr get-login-password --region $AWS_REGION | \
  docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

if [ $? -ne 0 ]; then
  echo "Falló la autenticación en ECR."
  exit 1
fi

echo "Descargando la imagen desde ECR..."
docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:${IMAGE_TAG}

# Detener el contenedor solo si existe
if [ "$(docker ps -q -f name=tienda-virtual)" ]; then
  docker stop tienda-virtual
fi

# Eliminar el contenedor solo si existe
if [ "$(docker ps -aq -f name=tienda-virtual)" ]; then
  docker rm tienda-virtual
fi

echo "Iniciando nuevo contenedor..."
docker run -d \
  --name ${REPO_NAME} \
  -e SPRING_DATASOURCE_URL=$SPRING_DATASOURCE_URL \
  -e SPRING_DATASOURCE_USERNAME=$SPRING_DATASOURCE_USERNAME \
  -e SPRING_DATASOURCE_PASSWORD=$SPRING_DATASOURCE_PASSWORD \
  -p 8080:8080 \
  ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:${IMAGE_TAG}

echo "Contenedor desplegado correctamente."