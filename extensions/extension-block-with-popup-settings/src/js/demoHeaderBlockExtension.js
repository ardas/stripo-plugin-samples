import {BLOCK_UNIQUE_CLASS_NAME} from './const';
import translations from './translations';
import defaultLayout from './layout/defaultLayout.html';
import {openModalWindow} from './modal_window';


export function createDemoHeaderBlockExtension(stripoConfig, stripoApi, extensionBasePath) {
    function getBlockLayoutToDrop() {
        return defaultLayout;
    }

    function blockDropped(block) {
        block.find(`>.esd-structure-type`).html(stripoApi.translate('block.name'));
    }

    function onSelectBlock(block, context) {
        if (!context.showCustomBlockSettings) {
            openModalWindow(block, stripoApi);
        }
    }

    return {
        name: 'DemoBlockWithPopupSettings',
        iconClass: 'es-icon-header',
        uniqueClassName: BLOCK_UNIQUE_CLASS_NAME,
        canBeSavedToLibrary: true,
        settingsCssPath: '/assets/css/settings.css',
        i18n: translations,
        blockName: 'block.name',
        blockType: 'structure',
        disableSettingsPanel: true,
        getBlockLayoutToDrop,
        blockDropped,
        onSelectBlock
    }
}
