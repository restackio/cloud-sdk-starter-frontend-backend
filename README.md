# Sample Repository for Restack Cloud SDK

This repository is a sample project for helping you get started with Restack Cloud SDK. It showcases how to deploy applications, regardless of the programming language, in Restack and how they can communicate with each other.

## Overview

- **Frontend**: The frontend is developed using Next.js, TailwindCSS, and ReactJS.
- **Backend**: The backend is implemented in Python.

## What does this sample repository do?

The example application included in this repository performs a Question and Answer (QA) operation on a PDF file using LangChain and OpenAI.

## Features

- Deployment of applications in Restack.
- Communication between frontend and backend services.
- QA functionality on a PDF file using LangChain and OpenAI.

## Restack Cloud SDK

Restack Cloud SDK allows developers to seamlessly deploy their AI products, ensuring robust communication between services and efficient handling of complex operations.

## Getting started

To get started with this repository, follow the instructions below:

1. Create a repo based on this repository: [Create repo from example](https://github.com/new?template_name=cloud-sdk-starter-frontend-backend&template_owner=restackio)

2. Clone your new repo into local

## Testing it locally

To run the application using Docker, follow these steps:

1. Build and start the Docker images for both frontend and backend:

   ```bash
   docker-compose up
   ```

2. Access the application:

   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

3. To stop the containers:

   ```bash
   docker-compose down
   ```

## Deploying to Restack Cloud

To deploy the application to Restack Cloud, run the following command:

```bash
npm install @restackio/cloud
node restack_up.js
```

## Usage

Once both the frontend and backend servers are running, you can access the application via your web browser. The frontend will interact with the backend to perform QA operations on a PDF file.

## Contributing

Feel free to contribute to this repository by submitting issues or pull requests.

## License

This project is licensed under the MIT License.
