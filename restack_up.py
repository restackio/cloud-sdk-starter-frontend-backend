import os
from restack_sdk_cloud import RestackCloud

async def main():
    # Initialize the RestackCloud client with the SDK token from environment variables
    restack_cloud_client = RestackCloud(os.getenv('RESTACK_SDK_TOKEN'))

    # Define the backend application configuration
    backend_app = {
        'name': 'backend-python',
        'dockerFilePath': 'backend/Dockerfile',
        'dockerBuildContext': 'backend',
    }

    # Define the frontend application configuration
    frontend_app = {
        'name': 'frontend-python',
        'dockerFilePath': 'frontend/Dockerfile',
        'dockerBuildContext': 'frontend',
        'environmentVariables': [
            {
                'name': 'NEXT_PUBLIC_API_HOSTNAME',
                'linkTo': backend_app['name'],
            },
        ],
    }

    # Configure the stack with the applications
    await restack_cloud_client.stack({
        'name': 'development environment python',
        'previewEnabled': False,
        'applications': [backend_app, frontend_app],
    })

    # Deploy the stack
    await restack_cloud_client.up()

# Run the main function
if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
