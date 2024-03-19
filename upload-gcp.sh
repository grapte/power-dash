#!/bin/bash

# This script requires the Google Cloud SDK to be installed and Docker to be running.

# Input validation
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <path-to-gcp-credentials-file.json> <image-name>"
    exit 1
fi

GCP_CREDENTIALS_FILE="$1"
IMAGE_NAME="$2"
PROJECT_ID="$(gcloud config get-value project)"

# Authenticate with GCP
gcloud auth activate-service-account --key-file="${GCP_CREDENTIALS_FILE}"

# Configure Docker to use the credentials
gcloud auth configure-docker

# Build the Docker image
docker build -t ${IMAGE_NAME} .

# Tag the Docker image for GCR
docker tag ${IMAGE_NAME} gcr.io/${PROJECT_ID}/${IMAGE_NAME}

# Push the Docker image to GCR
docker push gcr.io/${PROJECT_ID}/${IMAGE_NAME}

echo "Image ${IMAGE_NAME} built and pushed to GCR successfully."