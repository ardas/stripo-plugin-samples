import {
    BLOCK_UNIQUE_CLASS_NAME,
    CONTROL_NAME_BLOCK_BACKGROUND_COLOR,
    CONTROL_NAME_BLOCK_BACKGROUND_IMAGE, CONTROL_NAME_BLOCK_FIXED_HEIGHT,
    CONTROL_NAME_BLOCK_PADDING,
    CONTROL_NAME_BLOCK_VISIBILITY
} from './const';
import defaultLayout from './layout/defaultLayout.html';
import translations from './translations';
import backgroundColorControl from "./controls/backgroundColorControl";
import backgroundImgControl from "./controls/backgroundImgControl";
import visibilityControl from "./controls/visibilityControl";
import fixedHeightControl from "./controls/fixedHeightControl";

export function createExtension(stripoConfig, stripoApi, extensionBasePath) {
    function isEnabled() {
        return true;
    }

    function getBlockLayoutToDrop() {
        return defaultLayout;
    }

    function blockDropped(block) {
        block.find('p').html(stripoApi.translate('preview.title'));
    }

    function addDevMarkup(block) {
    }

    function getBlockLabel() {
        return stripoApi.translate('preview.label');
    }


    return {
        name: 'CouponExtension',
        iconClass: 'es-icon-structure',
        uniqueClassName: BLOCK_UNIQUE_CLASS_NAME,
        settingsCssPath: '/assets/css/settings.css',
        previewCssPath: '/assets/css/preview.css',
        i18n: translations,
        blockName: 'block.name',
        blockType: 'block',
        hasInternalBlocks: false,
        controlsToCreate: [
            {control: backgroundColorControl, parentControlName: 'stripoBackgroundColorControl'},
            {control: backgroundImgControl, parentControlName: 'stripoBackgroundImageControl'},
            {control: visibilityControl, parentControlName: 'stripoVisibilityControl'},
            {control: fixedHeightControl, parentControlName: 'stripoFixedHeightControl'},
        ],
        blockControls: [
            CONTROL_NAME_BLOCK_BACKGROUND_COLOR,
            CONTROL_NAME_BLOCK_BACKGROUND_IMAGE,
            CONTROL_NAME_BLOCK_VISIBILITY,
            CONTROL_NAME_BLOCK_FIXED_HEIGHT,
        ],

        isEnabled,
        getBlockLayoutToDrop,
        blockDropped,
        getBlockLabel,
    }
}
