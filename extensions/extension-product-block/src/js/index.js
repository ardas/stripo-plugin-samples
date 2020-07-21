import stripoDefaultExtension from './stripoDefaultExtension';
import {createProductBlockExtension} from './productBlockExtension';

const extension = {
    create(stripoConfig, stripoApi, extensionBasePath) {
        return Object.assign({
            stripoConfig: stripoConfig,
            stripoApi: stripoApi,
            extensionBasePath: extensionBasePath,
            ...stripoDefaultExtension,
            ...createProductBlockExtension(stripoConfig, stripoApi, extensionBasePath)
        });
    }
};

self['ProductBlockExtension'] = extension;




