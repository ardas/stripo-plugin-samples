import {BLOCK_UNIQUE_CLASS_NAME, CONTROL_NAME_BLOCK_BACKGROUND_IMAGE} from './const';
import defaultLayout from './layout/defaultLayout.html';
import translations from './translations';
import backgroundColorControl from '../../../extension-useful-links-block/src/js/controls/backgroundColorControl';
import {CONTROL_NAME_BLOCK_BACKGROUND_COLOR} from '../../../extension-useful-links-block/src/js/const';
import backgroundImgControl from './controls/backgroundImgControl';


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
        block.find('table.structure-like-block-content').addClass('esd-insideblock-dropzone');
    }

    function getBlockLabel() {
        return stripoApi.translate('preview.label');
    }

    function onCleanLayout(bodyCheerioWrapper, cheerio) {
        bodyCheerioWrapper.find(`.esd-empty-container`).closest('table.esd-insideblock-dropzone').remove();
    }

    return {
        name: 'StructureLikeBlock',
        iconClass: 'es-icon-structure-like',
        uniqueClassName: BLOCK_UNIQUE_CLASS_NAME,
        settingsCssPath: '/assets/css/settings.css',
        previewCssPath: '/assets/css/preview.css',
        i18n: translations,
        blockName: 'block.name',
        blockType: 'block',
        hasInternalBlocks: true,
        controlsToCreate: [
            {control: backgroundColorControl, parentControlName: 'stripoBackgroundColorControl'},
            {control: backgroundImgControl, parentControlName: 'stripoBackgroundImageControl'},
        ],
        blockControls: [
            CONTROL_NAME_BLOCK_BACKGROUND_COLOR,
            CONTROL_NAME_BLOCK_BACKGROUND_IMAGE,
        ],
        addDevMarkup,
        isEnabled,
        getBlockLayoutToDrop,
        blockDropped,
        getBlockLabel,
        onCleanLayout
    }
}
