# 'Demo header' block extension

## Creating extension

1. Install dependencies
     ```
     npm ci
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
            "ignoreClickOutsideSelectors": "#fontSizeModal",
            "extensions": [
                {
                  "globalName": "DemoHeaderBlockExtension",
                  "url":"https://link_to_your_hosting/main.hash.extension.js"
                }
            ]    
         });
     ```
