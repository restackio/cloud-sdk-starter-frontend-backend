const RestackCloud = require("@restackio/restack-sdk-cloud-ts").default;

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
  };

  await restackCloudClient.stack({
    name: "development environment",
    previewEnabled: false,
    applications: [frontendApp, backendApp],
  });

  await restackCloudClient.up();
};

main();
