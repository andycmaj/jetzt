# jetzt - WORK IN PROGRESS!

`jetzt` is a small utility to build, package, and publish [Next.js](https://nextjs.org/) serverless applications to Azure Functions.

In general there are two ways of hosting a Next.js app on Azure Functions: 

1. Use one function that takes the request and routes it via Next.js's server mode
2. Publish each individual page as a separate Azure Function

`jetzt` uses the second approach. Each page is wrapped with a small, custom Azure Function specific handler, and a proxy is generated to maintain the original URL structure. 

Assets are uploaded to Azure Blob Storage and can be served using the CDN.

## Current state:

### Usage: 

`jetzt` is pretty much work in progress. Check again in a few days then the major features should be working. For now, proceed at your own risk:

1. Build your Next.js 9 serverless app (only version 9 is supported)
2. Make sure it builds successfully
3. Create a `jetzt.config.js` file, right now only the stroage url will be used, but the other options are already required. Url needs to point to a blob container on a storage account:
   ```
    {
        "storage": {
            "account": "foo",
            "container": "baar",
            "url": "https://nextjsfunctionsstorage.blob.core.windows.net/nextjs-functions-assets/"
        },
        "functionApp": {
            
        }
    }
   ```
3. Execute: `npx jetzt .` from your project's folder. This will build the required packages and configuration in `./build`

Soon, the publishing will work automatically, but for now:

1. Upload `package.zip` and `packagename.txt` to an Azure storage account fileshare and follow the [instructions](https://docs.microsoft.com/en-us/azure/azure-functions/run-functions-from-deployment-package#enabling-functions-to-run-from-a-package) to enable running from a package for best cold-start performance
2. Upload the content from `build/assets` to the storage account specified in the configuration
3. Navigate to your Azure Function app.

## FAQ

### Is this tested and production ready?

Hell, no! This is an early experiment, so expect things to break. If you do want to play with it, I'd love to hear about your experience.

### What about the name? 

Placeholder, expect it to change :)
