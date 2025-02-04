import {BLOCK_UNIQUE_CLASS_NAME, CONTROL_NAME_BLOCK_BACKGROUND_COLOR, CONTROL_NAME_BLOCK_BACKGROUND_IMAGE, CONTROL_NAME_BLOCK_PADDING} from './const';
import defaultLayout from './layout/defaultLayout.html';
import translations from './translations';
import backgroundImgControl from './controls/backgroundImgControl';
import backgroundColorControl from './controls/backgroundColorControl';
import blockPaddingControl from './controls/blockPaddingControl';


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
        name: 'StructureExtension',
        iconClass: 'es-icon-structure',
        uniqueClassName: BLOCK_UNIQUE_CLASS_NAME,
        settingsCssPath: '/assets/css/settings.css',
        previewCssPath: '/assets/css/preview.css',
        i18n: translations,
        blockName: 'block.name',
        blockType: 'structure',
        hasInternalBlocks: true,
        canBlockBeDroppedInside: ()=> {
            return false;
        },
        useDefaultStructurePaddings: true,
        controlsToCreate: [
            {control: backgroundColorControl, parentControlName: 'stripoBackgroundColorControl'},
            {control: backgroundImgControl, parentControlName: 'stripoBackgroundImageControl'},
            {control: blockPaddingControl, parentControlName: 'stripoStructurePaddingsControl'},
        ],
        blockControls: [
            CONTROL_NAME_BLOCK_BACKGROUND_COLOR,
            CONTROL_NAME_BLOCK_BACKGROUND_IMAGE,
            CONTROL_NAME_BLOCK_PADDING,
        ],
        addDevMarkup,
        isEnabled,
        getBlockLayoutToDrop,
        blockDropped,
        getBlockLabel,
        onCleanLayout
    }
}
