import * as dotenv from "dotenv";
import RestackCloud from "@restackio/restack-sdk-cloud-ts";
dotenv.config();

const main = async () => {
  const restackCloudClient = new RestackCloud(
    process.env.RESTACK_SDK_TOKEN as string
  );

  const frontendApp = {
    name: "my-ai-application", // application name is used as a persistent identifier. Changing your application name will result in creating a new application on the restack console. The uniqueness is at the stack level. An application can share name as long as they are not in the same stack.
    dockerFilePath: "Dockerfile",
    environmentVariables: [
      {
        name: "TEST_VARIABLE",
        value: "test_2",
      },
    ],
  };

  await restackCloudClient.stack({
    name: "production environment",
    previewEnabled: false,
    applications: [frontendApp],
  });

  await restackCloudClient.up();
};

main();
