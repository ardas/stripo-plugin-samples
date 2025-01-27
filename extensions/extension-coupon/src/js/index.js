import stripoDefaultExtension from './stripoDefaultExtension';
import {createExtension} from './couponExtension';

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

self['CouponExtension'] = extension;




