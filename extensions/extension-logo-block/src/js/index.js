import stripoDefaultExtension from './stripoDefaultExtension';
import {createLogoExtension} from './logoExtension';

const extension = {
    create(stripoConfig, stripoApi, extensionBasePath) {
        const res =  Object.assign({
            stripoConfig: stripoConfig,
            stripoApi: stripoApi,
            extensionBasePath: extensionBasePath,
            ...stripoDefaultExtension,
            ...createLogoExtension(stripoConfig, stripoApi, extensionBasePath)
        });
        return res;
    }
};

self['LogoBlockExtension'] = extension;




