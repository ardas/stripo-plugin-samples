import {BLOCK_UNIQUE_CLASS_NAME} from './const';
import translations from './translations';
import defaultLayout from './layout/layout.html';

const paramsMap = {
    ['#SRC#']: 'src',
    ['#WIDTH#']: 'width',
    ['#ALT_TEXT#']: 'altText',
}

export function createLogoExtension(stripoConfig, stripoApi, extensionBasePath) {
    function isEnabled() {
        return stripoConfig.logoBlock && stripoConfig.logoBlock.enabled;
    }

    function getBlockLayoutToDrop() {
        let layout = defaultLayout;
        Object.keys(paramsMap).forEach(paramKey => {
            const paramValue = stripoConfig.logoBlock[paramsMap[paramKey]];
            layout = layout.replace(paramKey, paramValue);
        })
        return layout;
    }

    function getBlockLabel(block) {
        return stripoApi.translate('block.name');
    }

    return {
        name: 'UsefulLinksDemoBlock',
        iconClass: 'es-icon-logo',
        uniqueClassName: BLOCK_UNIQUE_CLASS_NAME,
        settingsCssPath: '/assets/css/settings.css',
        i18n: translations,
        blockName: 'block.name',
        blockType: 'block',

        isEnabled,
        getBlockLayoutToDrop,
        getBlockLabel
    }}
