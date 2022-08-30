import {BLOCK_UNIQUE_CLASS_NAME, CONTROL_NAME_BLOCK_BACKGROUND_COLOR, CONTROL_NAME_TITLE_TEXT_COLOR} from './const';
import translations from './translations';
import backgroundColorControl from './controls/backgroundColorControl';
import textColorControl from './controls/textColorControl';
import defaultLayout from './layout/layout.html';


export function createUsefulLinksExtension(stripoConfig, stripoApi, extensionBasePath) {
    function isEnabled() {
        return stripoConfig.usefulLinksBlock && stripoConfig.usefulLinksBlock.enabled;
    }

    function emailInitialized(emailBody) {
        if (!isEnabled()) {
            return;
        }
        const usefulLinksBlocks = emailBody.find(`.${BLOCK_UNIQUE_CLASS_NAME}`);
        if (usefulLinksBlocks.length) {
             usefulLinksBlocks.each(function() {
                 const block = stripoApi.jQuery(this);
                 updateLinks(block);
             });
        }
        updateViewOnlyMode();
    }

    function updateLinks(block) {
        block.find('ul').remove();
        let links = '<ul>'
        stripoConfig.usefulLinksBlock.items.forEach(item => {
            links += `<li><a target="_blank" href="${item.link}">${item.label}</a></li>`;
        });
        links += '</ul>';
        block.append(links);
    }


    function getBlockLayoutToDrop() {
        return defaultLayout.replace(/#USEFUL_LINKS#/g, stripoApi.translate('preview.links.title'));
    }

    function blockDropped(block) {
        updateLinks(block);
        updateViewOnlyMode();
    }

    function onBlockCopy() {
        updateViewOnlyMode();
    }

    function onBlockDelete() {
        updateViewOnlyMode();
    }

    function getBlockLabel(block) {
        return stripoApi.translate('block.name');
    }

    function updateViewOnlyMode() {
        if (stripoConfig.usefulLinksBlock && stripoConfig.usefulLinksBlock.maxCount) {
            let actualBlocksCount = stripoApi.getFullDomTree().find(`.${BLOCK_UNIQUE_CLASS_NAME}`).length;
            let isMoreThanAllowedBlocks = stripoConfig.usefulLinksBlock.maxCount <= actualBlocksCount;
            stripoApi.setViewOnlyMode(isMoreThanAllowedBlocks);
        }
    }

    function getViewOnlyModeTooltipText() {
        return stripoApi.translate('block.disabled', [stripoConfig.usefulLinksBlock.maxCount]);
    }

    function getTooltipText() {
        return stripoApi.translate('useful links extension');
    }

    return {
        name: 'UsefulLinksDemoBlock',
        iconClass: 'es-icon-useful-links',
        uniqueClassName: BLOCK_UNIQUE_CLASS_NAME,
        canBeSavedToLibrary: false,
        settingsCssPath: '/assets/css/settings.css',
        i18n: translations,
        blockName: 'block.name',
        emptyContainerIcon: false,
        blockType: 'block',
        controlsToCreate: [
            {control: backgroundColorControl, parentControlName: 'stripoBackgroundColorControl'},
            {control: textColorControl, parentControlName: 'stripoFontColorControl'}
        ],
        blockControls: [
            CONTROL_NAME_BLOCK_BACKGROUND_COLOR,
            CONTROL_NAME_TITLE_TEXT_COLOR
        ],

        isEnabled,
        emailInitialized,
        getBlockLayoutToDrop,
        blockDropped,
        onBlockCopy,
        onBlockDelete,
        getBlockLabel,
        getViewOnlyModeTooltipText,
        getTooltipText,
    }
}
