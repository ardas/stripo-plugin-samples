import stripoDefaultExtension from './stripoDefaultExtension';
import {createUsefulLinksExtension} from './usefulLinksExtension';

const extension = {
    create(stripoConfig, stripoApi, extensionBasePath) {
        return Object.assign({
            stripoConfig: stripoConfig,
            stripoApi: stripoApi,
            extensionBasePath: extensionBasePath,
            ...stripoDefaultExtension,
            ...createUsefulLinksExtension(stripoConfig, stripoApi, extensionBasePath)
        });
    }
};

self['UsefulLinksBlockExtension'] = extension;




