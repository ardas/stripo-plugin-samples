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
                     "groups": [{
                          "id": "group1",
                          "name": "iPhone X",
                          "image_url": "https://zwkxy.stripocdn.email/content/guids/CABINET_afa9e4cdc44a36489ab8a25bf18acd36/images/madibadeafricaninspirationaxe4ufe3iv4unsplash_1_sJE.png",
                          "price": 999.95,
                          "count": 5
                        }, {
                          "id": "group2",
                          "name": "MacBook Pro",
                          "image_url": "https://zwkxy.stripocdn.email/content/guids/CABINET_04b76f2be80a3047c3463cc03b80c354/images/pexelsannashvets4588065.png",
                          "price": 1499.95,
                          "count": 1
                        }]
                  }    
               });
           ```