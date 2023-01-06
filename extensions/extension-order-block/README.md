# 'Product' block extension

## Creating extension

1. Install dependencies
     ```
     npm i
     ```
2. Compile this code
    ```bash
    npm run build
    ```
3. Place the compiled files with the extension on any hosting you like
4. When initializing the Stripo editor, insert the code sample given below into the parameters:
     ```bash
         window.Stripo.init({
            ...,
            "extensions": [
                {
                  "globalName": "ProductBlockExtension",
                  "url":"https://link_to_your_hosting/main.hash.extension.js"
                }
            ],
            "productDemoBlock": {
                "enabled": true,
                "groups": [
                  {
                    "id": "group1",
                    "name": "iPhone X",
                    "count": 5
                  },
                  {
                    "id": "group2",
                    "name": "MacBook Pro",
                    "count": 1
                  }
                ]
            }    
         });
     ```