import stripoDefaultExtension from './stripoDefaultExtension.js';
import { createOrderBlockExtension } from './orderBlockExtension.js';

const extension = {
    create(stripoConfig, stripoApi, extensionBasePath) {
        return Object.assign({
            stripoConfig: stripoConfig,
            stripoApi: stripoApi,
            extensionBasePath: extensionBasePath,
            ...stripoDefaultExtension,
            ...createOrderBlockExtension(stripoConfig, stripoApi)
        });
    }
};

self['OrderBlockExtension'] = extension;
