import { RestackCloud } from "@restackio/restack-sdk-cloud-ts";

const main = async () => {
  const restackCloudClient = new RestackCloud(process.env.RESTACK_SDK_TOKEN);

  const backendApp = {
    name: "backend",
    dockerFilePath: "backend/Dockerfile",
    environmentVariables: [
      {
        name: "TEST_VARIABLE",
        value: "test_2",
      },
    ],
    dockerBuildContext: 'backend'
  };

  const frontendApp = {
    name: "frontend",
    dockerFilePath: "frontend/Dockerfile",
    environmentVariables: [
      {
        name: "NEXT_PUBLIC_API_HOSTNAME",
        linkTo: backendApp.name,
      },
    ],
    dockerBuildContext: 'frontend'
  };


  await restackCloudClient.stack({
    name: "development environment",
    previewEnabled: false,
    applications: [backendApp, frontendApp],
  });

  await restackCloudClient.up();
};

main();
