import { RestackCloud } from "@restackio/restack-sdk-cloud-ts";

const main = async () => {
  const restackCloudClient = new RestackCloud(process.env.RESTACK_SDK_TOKEN);

  const frontendApp = {
    name: "my-frontend-app",
    dockerFilePath: "frontend/Dockerfile",
    environmentVariables: [
      {
        name: "TEST_VARIABLE",
        value: "test_2",
      },
    ],
    dockerBuildContext: 'frontend'
  };

  const backendApp = {
    name: "my-backend-app",
    dockerFilePath: "backend/Dockerfile",
    environmentVariables: [
      {
        name: "TEST_VARIABLE",
        value: "test_2",
      },
    ],
    dockerBuildContext: 'backend'
  };

  await restackCloudClient.stack({
    name: "development environment",
    previewEnabled: false,
    applications: [backendApp, frontendApp],
  });

  await restackCloudClient.up();
};

main();
