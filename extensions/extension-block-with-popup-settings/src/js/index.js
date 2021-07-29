import stripoDefaultExtension from './stripoDefaultExtension';
import {createDemoHeaderBlockExtension} from './demoHeaderBlockExtension';

const extension = {
    create(stripoConfig, stripoApi, extensionBasePath) {
        return Object.assign({
            stripoConfig: stripoConfig,
            stripoApi: stripoApi,
            extensionBasePath: extensionBasePath,
            ...stripoDefaultExtension,
            ...createDemoHeaderBlockExtension(stripoConfig, stripoApi, extensionBasePath)
        });
    }
};

self['DemoHeaderBlockExtension'] = extension;




