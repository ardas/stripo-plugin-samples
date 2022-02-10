# 'Logo' block extension

## Creating extension

1. Install dependencies
     ```
     npm i
     ```
2. Compile this code
    ```bash
    npm run build
    ```
   1. Place the compiled files with the extension on any hosting you like
      1. When initializing the Stripo editor, insert the code sample given below into the parameters:
           ```bash
               window.Stripo.init({
                  ...,
                  "extensions": [
                      {
                        "globalName": "LogoBlockExtension",
                        "url":"https://link_to_your_hosting/main.hash.extension.js"
                      }
                  ],
                  "logoBlock": {
                      "enabled": true,
                      "src": "https://hpy.stripocdn.email/content/guids/CABINET_1ce849b9d6fc2f13978e163ad3c663df/images/22451592470360730.gif",
                      "altText": "Logo",
                      "width": "80px"
                  }    
            });
        ```
