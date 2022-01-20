import stripoDefaultExtension from './stripoDefaultExtension';
import {createExtension} from './structureLikeBlockExtension';

const extension = {
    create(stripoConfig, stripoApi, extensionBasePath) {
        return Object.assign({
            stripoConfig: stripoConfig,
            stripoApi: stripoApi,
            extensionBasePath: extensionBasePath,
            ...stripoDefaultExtension,
            ...createExtension(stripoConfig, stripoApi, extensionBasePath)
        });
    }
};

self['StructureLikeBlockExtension'] = extension;




