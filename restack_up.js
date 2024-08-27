import { RestackCloud } from "@restackio/restack-sdk-cloud-ts";

const main = async () => {
  const restackCloudClient = new RestackCloud(process.env.RESTACK_SDK_TOKEN);

  const frontendApp = {
    name: "my-frontend-app",
    dockerFilePath: "frontend/Dockerfile",
    environmentVariables: [
      {
        name: "NEXT_PUBLIC_API_HOSTNAME",
        value: "_",
      },
    ],
    dockerBuildContext: "frontend",
  };

  const backendApp = {
    name: "my-backend-app",
    dockerFilePath: "backend/Dockerfile",
    dockerBuildContext: "backend",
  };

  await restackCloudClient.stack({
    name: "development environment",
    previewEnabled: false,
    applications: [backendApp, frontendApp],
  });

  await restackCloudClient.up();
};

main();
