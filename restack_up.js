import { RestackCloud } from "@restackio/cloud";

const main = async () => {
  const restackCloudClient = new RestackCloud(process.env.RESTACK_SDK_TOKEN);

  const backendApp = {
    name: "backend",
    dockerFilePath: "backend/Dockerfile",
    dockerBuildContext: "backend",
  };

  const frontendApp = {
    name: "frontend",
    dockerFilePath: "frontend/Dockerfile",
    dockerBuildContext: "frontend",
    environmentVariables: [
      {
        name: "NEXT_PUBLIC_API_HOSTNAME",
        linkTo: backendApp.name,
      },
    ],
  };

  await restackCloudClient.stack({
    name: "development environment",
    previewEnabled: false,
    applications: [backendApp, frontendApp],
  });

  await restackCloudClient.up();
};

main();
