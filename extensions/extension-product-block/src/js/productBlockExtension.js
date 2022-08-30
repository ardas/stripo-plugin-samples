import {
    ATTR_NAME_BLOCK_CONFIGURATION,
    ATTR_NAME_RECOMMENDATION_GROUPS,
    BLOCK_UNIQUE_CLASS_NAME,
    CONTROL_NAME_BLOCK_GROUPS, CONTROL_NAME_BLOCK_PADDING,
    CONTROL_NAME_CARD_BACKGROUND_COLOR,
    CONTROL_NAME_CARD_BORDER,
    CONTROL_NAME_CARD_COMPOSITION,
    CONTROL_NAME_CARD_ORIENTATION,
    CONTROL_NAME_CARDS_IN_ROW_COUNT,
    EVENT_NAME_LAYOUT_CHANGED,
    ORIENTATION_HORIZONTAL,
    ORIENTATION_VERTICAL,
    PRODUCT_BLOCK_EMPTY_CLASS
} from './const';
import translations from "./translations";
import cardBackgroundColorControl from "./controls/cardBackgroundColorControl";
import cardBorderControl from "./controls/cardBorderControl";
import cardOrientationControl from "./controls/cardOrientationControl";
import cardsInRowCountControl from "./controls/cardsInRowCountControl";
import cardCompositionControl from "./controls/cardCompositionControl";
import blockGroupsControl from "./controls/blockGroupsControl";
import cardTextColorControl from "./controls/composition/cardTextColorControl";
import cardTextAlignControl from "./controls/composition/cardTextAlignControl";
import cardTextStyleControl from "./controls/composition/cardTextStyleControl";
import cardButtonColorControl from "./controls/composition/cardButtonColorControl";
import cardButtonStyleControl from "./controls/composition/cardButtonStyleControl";
import cardButtonTextControl from "./controls/composition/cardButtonTextControl";
import cardButtonTextColorControl from "./controls/composition/cardButtonTextColorControl";
import cardButtonBorderRadiusControl from "./controls/composition/cardButtonBorderRadiusControl";
import cardButtonAlignControl from "./controls/composition/cardButtonAlignControl";
import cardButtonStretchControl from "./controls/composition/cardButtonStretchControl";
import {createBlockConfigurationService} from "./blockConfiguration";
import verticalContainerLayout from "./layout/verticalContainerLayout.html";
import horizontalStructureLayout from "./layout/horizontalStructureLayout.html";
import defaultLayout from "./layout/defaultLayout.html";
import blockBorderControl from './controls/blockBorderControl';
import blockPaddingControl from './controls/blockPaddingControl';
import cardTextPaddingControl from './controls/composition/cardTextPaddingControl';
import cardButtonExternalPaddingControl from './controls/composition/cardButtonExternalPaddingControl';
import cardButtonInternalPaddingControl from './controls/composition/cardButtonInternalPaddingControl';
import cardTextLineSpacingControl from './controls/composition/cardTextLineSpacingControl';
import cardButtonBorderControl from './controls/composition/cardButtonBorderControl';
import cardImageSizeControl from './controls/composition/cardImageSizeControl';


export function createProductBlockExtension(stripoConfig, stripoApi, extensionBasePath) {
    const blockConfigurationService = createBlockConfigurationService(stripoConfig, stripoApi);

    function isEnabled() {
        return stripoConfig.productDemoBlock && stripoConfig.productDemoBlock.enabled;
    }

    function emailInitialized(emailBody) {
        const productBlocks = emailBody.find(`.${BLOCK_UNIQUE_CLASS_NAME}[${ATTR_NAME_RECOMMENDATION_GROUPS}]`);
        if (productBlocks.length) {
            const stripoConfigGroups = stripoConfig.productDemoBlock.groups;
            let groupsUsed = [];
            productBlocks.each(function() {
                const block = stripoApi.jQuery(this);
                block.html(getLayoutWithDemoValues(block.html()));
                let blockConfig = blockConfigurationService.getBlockConfiguration(block);
                let shouldUpdateLabel = false;
                let shouldUpdateLayout = false;
                const groupsToRemove = [];
                blockConfig.groups.forEach(blockGroup => {
                    const groupFromAppConfig = stripoConfigGroups.find(g => g.id == blockGroup.id);
                    if (!groupFromAppConfig || groupsUsed.includes(blockGroup.id)) {
                        groupsToRemove.push(blockGroup.id);
                        shouldUpdateLayout = true;
                    } else {
                        if (groupFromAppConfig.name !== blockGroup.name) {
                            blockGroup.name = groupFromAppConfig.name;
                            shouldUpdateLabel = true;
                        }
                        if (groupFromAppConfig.count != blockGroup.count) {
                            blockGroup.count = groupFromAppConfig.count;
                            shouldUpdateLayout = true;
                        }
                    }
                });
                if (groupsToRemove.length) {
                    blockConfig.groups = blockConfig.groups.filter(g => !groupsToRemove.includes(g.id));
                }
                if (shouldUpdateLayout || shouldUpdateLabel) {
                    blockConfig = wrapBlockWithTypeIdentifierAttributesAndGetConfig(block, blockConfig);
                    updateBlockLabel(block);
                }
                if (shouldUpdateLayout) {
                    updateLayout(block, blockConfig);
                }
                groupsUsed = groupsUsed.concat(blockConfig.groups.map(g => g.id));
            });
        }
    }

    function getDemoValues() {
        return [
            {key: '#PRODUCT_IMAGE_SRC#', value: `${extensionBasePath}/assets/images/image-placeholder.png`},
            {key: '#PRODUCT_TITLE#', value: stripoApi.translate('preview.layout.demo.name')},
            {key: '#PRODUCT_VENDOR_CODE#', value: stripoApi.translate('preview.layout.demo.vendorCode', [5803701783])},
            {key: '#PRODUCT_PRICE#', value: '1 234 ₽'},
            {key: '#PRODUCT_DIMENSIONS#', value: stripoApi.translate('preview.layout.demo.dimensions', [430, 32, 149])},
            {key: '#PRODUCT_BUTTON_TEXT#', value: stripoApi.translate('preview.layout.demo.button'), skipDecode: true}
        ];
    }

    function getLayoutWithDemoValues(layout) {
        let result = layout;
        getDemoValues().forEach(item => {
            result = result.replace(new RegExp(item.key,"g"), item.value);
        });
        return result;
    }

    function getLayoutWithoutDemoValues(layout) {
        let result = layout;
        getDemoValues().forEach(item => {
            if (!item.skipDecode) {
                result = result.replace(new RegExp(item.value,"g"), item.key);
            }
        });
        return result;
    }

    function updateLayout(jStructure, blockConfig) {
        if (!jStructure.attr(ATTR_NAME_RECOMMENDATION_GROUPS)) {
            stripoApi.updateStructureLayoutForHorizontalOrientation(jStructure, getDefaultLayout(), blockConfig);
        } else {
            switch (blockConfig.orientation) {
                case ORIENTATION_VERTICAL:
                    stripoApi.updateStructureLayoutForVerticalOrientation(jStructure, getLayoutWithDemoValues(verticalContainerLayout), blockConfig);
                    break;
                case ORIENTATION_HORIZONTAL:
                    stripoApi.updateStructureLayoutForHorizontalOrientation(jStructure, getLayoutWithDemoValues(horizontalStructureLayout), blockConfig);
                    break;
            }
        }
        blockConfigurationService.setBlockConfiguration(jStructure, blockConfig);
        stripoApi.triggerEvent(EVENT_NAME_LAYOUT_CHANGED);
    }

    function wrapBlockWithTypeIdentifierAttributesAndGetConfig(block, blockConfig) {
        if (!blockConfig) {
            blockConfig = blockConfigurationService.getBlockConfiguration(block) || {};
        }
        const updatedConfig = blockConfigurationService.getOrCreateConfig(blockConfig);
        if (updatedConfig.groups.length) {
            block
                .attr(ATTR_NAME_RECOMMENDATION_GROUPS, updatedConfig.groups.map(g => g.id).join(','))
                .removeClass(PRODUCT_BLOCK_EMPTY_CLASS);
        } else {
            block
                .removeAttr(ATTR_NAME_RECOMMENDATION_GROUPS)
                .addClass(PRODUCT_BLOCK_EMPTY_CLASS);
        }
        blockConfigurationService.setBlockConfiguration(block, updatedConfig);
        return updatedConfig;
    }

    function updateBlockLabel(block) {
        block.find(`>.esd-structure-type`).html(getBlockLabel(block));
    }

    function getDefaultLayout() {
        return defaultLayout.replace(/#SELECT_GROUP#/g, stripoApi.translate('preview.empty.description'));
    }

    function getBlockLayoutToDrop() {
        const element = stripoApi.jQuery(getDefaultLayout());
        wrapBlockWithTypeIdentifierAttributesAndGetConfig(element);
        return element[0].outerHTML;
    }

    function blockDropped(block) {
        updateBlockLabel(block);
    }

    function getBlockLabel(block) {
        const blockConfiguration = blockConfigurationService.getBlockConfiguration(block);
        return blockConfiguration.groups.map(g => g.name).join(', ') || stripoApi.translate('preview.label');
    }

    function getDefaultSettingsPanelState(block) {
        return {
            blockConfig: blockConfigurationService.getBlockConfiguration(block),
            disabledGroupsIds: getDisabledGroupsIdsForBlock(block)
        }
    }

    function onCleanLayout(bodyCheerioWrapper, cheerio) {
        bodyCheerioWrapper.find(`.${PRODUCT_BLOCK_EMPTY_CLASS}`).parent().remove();
        bodyCheerioWrapper.find(`.${BLOCK_UNIQUE_CLASS_NAME}`).each(function() {
            const blockWrapper = cheerio(this, undefined, undefined, {decodeEntities: false});
            blockWrapper.html(getLayoutWithoutDemoValues(blockWrapper.html()));
        });
    }

    function onBlockCopy(sourceBlock, targetBlock) {
        let blockConfig = blockConfigurationService.getBlockConfigurationForCopiedBlock(targetBlock);
        blockConfig = wrapBlockWithTypeIdentifierAttributesAndGetConfig(targetBlock, blockConfig);
        updateLayout(targetBlock, blockConfig);
        updateBlockLabel(targetBlock);
    }

    function getDisabledGroupsIdsForBlock(block) {
        const recommendationsBlocks = stripoApi.getFullDomTree().find(`.${BLOCK_UNIQUE_CLASS_NAME}[${ATTR_NAME_RECOMMENDATION_GROUPS}]`);
        let groupIds = [];
        recommendationsBlocks.each(function() {
            const recommendationsBlock = stripoApi.jQuery(this);
            if (!recommendationsBlock.is(block)) {
                groupIds = groupIds.concat(recommendationsBlock.attr(ATTR_NAME_RECOMMENDATION_GROUPS).split(','));
            }
        });
        return groupIds;
    }


    return {
        name: 'DemoProductBlock',
        iconClass: 'es-icon-product',
        uniqueClassName: BLOCK_UNIQUE_CLASS_NAME,
        canBeSavedToLibrary: true,
        settingsCssPath: '/assets/css/settings.css',
        previewCssPath: '/assets/css/preview.css',
        i18n: translations,
        blockName: 'block.name',
        emptyContainerIcon: true,
        blockType: 'multi-orientation',
        blockConfigAttributeNames: [
            ATTR_NAME_BLOCK_CONFIGURATION
        ],
        controlsToCreate: [
            {control: blockBorderControl, parentControlName: 'stripoStructureBorderControl'},
            {control: blockPaddingControl, parentControlName: 'stripoStructurePaddingsControl'},
            {control: cardBackgroundColorControl, parentControlName: 'stripoBackgroundColorControl'},
            {control: cardBorderControl, parentControlName: 'stripoBorderControl'},
            {control: cardOrientationControl},
            {control: cardsInRowCountControl},
            {control: cardCompositionControl},
            {control: blockGroupsControl},
            {control: cardImageSizeControl, parentControlName: 'stripoImageSizeControl'},
            {control: cardTextColorControl, parentControlName: 'stripoFontColorControl'},
            {control: cardTextAlignControl, parentControlName: 'stripoTextAlignControl'},
            {control: cardTextStyleControl, parentControlName: 'stripoTextStyleControl'},
            {control: cardTextLineSpacingControl, parentControlName: 'stripoTextLineSpacingControl'},
            {control: cardTextPaddingControl, parentControlName: 'stripoPaddingСontrol'},
            {control: cardButtonColorControl, parentControlName: 'stripoButtonColorControl'},
            {control: cardButtonStyleControl, parentControlName: 'stripoButtonStyleControl'},
            {control: cardButtonTextControl, parentControlName: 'stripoButtonTextControl'},
            {control: cardButtonTextColorControl, parentControlName: 'stripoButtonTextColorControl'},
            {control: cardButtonBorderControl, parentControlName: 'stripoButtonBorderControl'},
            {control: cardButtonBorderRadiusControl, parentControlName: 'stripoButtonBorderRadiusControl'},
            {control: cardButtonAlignControl, parentControlName: 'stripoButtonAlignControl'},
            {control: cardButtonStretchControl, parentControlName: 'stripoButtonStretchControl'},
            {control: cardButtonInternalPaddingControl, parentControlName: 'stripoButtonInternalPaddingControl'},
            {control: cardButtonExternalPaddingControl, parentControlName: 'stripoPaddingСontrol'}
        ],
        blockControls: [
            CONTROL_NAME_BLOCK_GROUPS,
            CONTROL_NAME_CARD_ORIENTATION,
            CONTROL_NAME_CARDS_IN_ROW_COUNT,
            CONTROL_NAME_BLOCK_PADDING,
            CONTROL_NAME_CARD_BACKGROUND_COLOR,
            CONTROL_NAME_CARD_BORDER,
            CONTROL_NAME_CARD_COMPOSITION
        ],

        isEnabled,
        emailInitialized,
        getBlockLayoutToDrop,
        blockDropped,
        getBlockLabel,
        getDefaultSettingsPanelState,
        onCleanLayout,
        onBlockCopy,
        updateLayout,
        wrapBlockWithTypeIdentifierAttributesAndGetConfig,
        updateBlockLabel,
        blockConfigurationService
    }
}
