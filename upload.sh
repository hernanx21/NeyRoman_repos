#!/bin/bash

# Variables
IMAGE_NAME=$1
DOCKERHUB_USERNAME=$2
DOCKERHUB_PASSWORD=$3
TAG=$4

# Install dependencies
npm ci

#if the installation fails, exit the script
if [ $? -ne 0 ]; then
  echo "La instalación de dependencias falló"
  exit 1
fi

#Run the tests
npm run test

#if the tests fail, exit the script
if [ $? -ne 0 ]; then
  echo "Los tests fallaron"
  exit 1
fi

## validate if the variables are not empty

if [ -z "$IMAGE_NAME" ]; then
  echo "Debe proporcionar el nombre de la imagen"
  exit 1
fi

if [ -z "$DOCKERHUB_USERNAME" ]; then
  echo "Debe proporcionar el nombre de usuario de Docker Hub"
  exit 1
fi

if [ -z "$DOCKERHUB_PASSWORD" ]; then
  echo "Debe proporcionar la contraseña de Docker Hub"
  exit 1
fi

if [ -z "$TAG" ]; then
  echo "Debe proporcionar el tag para la imagen"
  exit 1
fi

# Login to Docker Hub

docker login -u "$DOCKERHUB_USERNAME" -p "$DOCKERHUB_PASSWORD"

# Build the image

docker build -t $IMAGE_NAME .

# Tag the image

docker tag $IMAGE_NAME $DOCKERHUB_USERNAME/$IMAGE_NAME:$TAG

# Push the image

docker push $DOCKERHUB_USERNAME/$IMAGE_NAME:$TAG

# Run the image

docker run -d -p 3000:3000 $DOCKERHUB_USERNAME/$IMAGE_NAME:$TAG
