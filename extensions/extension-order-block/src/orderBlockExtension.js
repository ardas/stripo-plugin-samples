import { ATTR_NAME_BLOCK_CONFIGURATION, ATTR_NAME_RECOMMENDATION_GROUPS, PRODUCT_BLOCK_EMPTY_CLASS, PREVIEW_LABEL,BLOCK_NAME,
    ALERT_MODAL, CLOSE_ALERT_MODAL, CUSTOM_BLOCK_TEXT,CLOSE_ALERT_MODAL_FUNCTION,CONTROL_NAME_BLOCK_GROUPS,BLOCK_CONTENT_ERROR,BLOCK_CONTENT_NO_HTML,
    PREVIEW_EMPTY_DESCRIPTION } from './const.js';
import translations from "./translations.js";
import blockGroupsControl from "./control/blockGroupsControl.js";
import { createBlockConfigurationService } from "./blockConfiguration.js";
import { DEAULT_LAYOUT_HTML, DEFAULT_LAYOUT_LOADING } from './layout/layout.js';
import { getBlock, messageContent, actionButtonsLengthCondition, closeAlertModal} from "./utility.js";

export function createOrderBlockExtension(stripoConfig, stripoApi) {

    const blockConfigurationService = createBlockConfigurationService(stripoConfig, stripoApi);
    const nullCheck = [null, undefined, ""];
    function isEnabled() {
        return stripoConfig.orderblockconfiguration && stripoConfig.orderblockconfiguration.enabled;
    }

    function emailInitialized(emailBody) {
        if (!isEnabled()) {
            return;
        }
    }

    function blockDropped(block) {
        if (stripoConfig?.orderblockconfiguration?.groups?.length === 0) {
            alertBlocknotLoaded();
        }
    }
    /**
     * Desc : Alert if there is no block available
     */
    function alertBlocknotLoaded() {
        renderAlertHtml(true, [ALERT_MODAL], 'caution', stripoApi.translate(ALERT_MESSAGE_BLOCK_NOT_LOADED)
            .replace(/{{tilename}}/g, stripoApi.translate(BLOCK_NAME)).replace(/{{languageName}}/g, 
            stripoConfig?.orderblockconfiguration?.configParameters?.localeName),
            [{ 'label': 'ok', 'value': true, id: CLOSE_ALERT_MODAL, class: '', 'functionName': CLOSE_ALERT_MODAL_FUNCTION }]);
    }
    function updateLayout(jStructure, blockConfig) {
        updateBlockText(jStructure, blockConfig);
    }

    function updateBlockText(element, blockConfiguration) {
        const mainElement = element[0].querySelector(`.${CUSTOM_BLOCK_TEXT}`);
        const infoContent = mainElement != null ? mainElement.innerHTML : "";
        if (mainElement != null) {
            mainElement.innerHTML = DEFAULT_LAYOUT_LOADING;
        }
        if (!blockConfiguration) {
            alertBlocknotLoaded();
            if (mainElement != null){
                mainElement.innerHTML = infoContent;
            }
            return;               
        }    
        return updatingBlockText(mainElement,infoContent, blockConfiguration);
    }

    function updatingBlockText(mainElement,infoContent, blockConfiguration){
        const selectedoptionData = getOptionData(blockConfiguration);
        return Promise.resolve(getBlock(selectedoptionData)).then((responseData)=>{
            if(!nullCheck.includes(responseData)){
                if (mainElement !== null &&  !nullCheck.includes(responseData.blockHtml)) {
                    mainElement.innerHTML = responseData.blockHtml;
                } else {
                    noHtmlContentError();
                    if (mainElement != null){
                        mainElement.innerHTML = infoContent;
                    }                       
                }
            }else{
                blockError();
                if (mainElement != null){
                    mainElement.innerHTML = infoContent;
                }   
            }
        });
    }

    function blockError(){
        renderAlertHtml(true, [ALERT_MODAL], 'caution', stripoApi.translate(BLOCK_CONTENT_ERROR),
        [{ 'label': 'ok', 'value': true, id: CLOSE_ALERT_MODAL, class: '', 'functionName': CLOSE_ALERT_MODAL_FUNCTION }]);
    }

    function noHtmlContentError(){
        renderAlertHtml(true, [ALERT_MODAL], 'caution', stripoApi.translate(BLOCK_CONTENT_NO_HTML),
        [{ 'label': 'ok', 'value': true, id: CLOSE_ALERT_MODAL, class: '', 'functionName': CLOSE_ALERT_MODAL_FUNCTION }]);
    }

    function getOptionData(blockConfiguration){
        return {
        "id": blockConfiguration?.groups[0].id,
        "contentTypeId": blockConfiguration?.groups[0].contenttype,
        "locale": blockConfiguration?.groups[0].locale,
        "version": blockConfiguration?.groups[0].version,
        "clientId": blockConfiguration.configParameters.clientId,
        "EntryType": blockConfiguration.configParameters.formValues.field,
        "formValues": blockConfiguration.configParameters.formValues,
        "configParameterFromEditor": blockConfiguration.configParameters,
        "renderUrl":blockConfiguration?.groups[0].renderUrl,
        "isStatic":blockConfiguration?.groups[0].isStatic,
        "blockType":blockConfiguration?.groups[0].blocktype
        }
    }

    function addBlockCustomAttibutes(element, key, value) {
        if (element[0].querySelector(`.${CUSTOM_BLOCK_TEXT}`).hasAttribute(key)) {
            element[0].querySelector(`.${CUSTOM_BLOCK_TEXT}`).removeAttribute(key);
        }
        element[0].querySelector(`.${CUSTOM_BLOCK_TEXT}`).setAttribute(key, value);
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
     /** 
     * Desc : Get blank layout
     */
    function getDefaultLayout() {
        return DEAULT_LAYOUT_HTML.replace(/#SELECT_BLOCK#/g,
            stripoApi.translate(PREVIEW_EMPTY_DESCRIPTION).replace(/{{tilename}}/g,
                stripoApi.translate(BLOCK_NAME))).replace(/#BLOCK_NAME#/g, stripoApi.translate(PREVIEW_LABEL));
    }

    function getBlockLayoutToDrop() {
        if (!isEnabled()) {
            return null;
        }
        const element = stripoApi.jQuery(getDefaultLayout());
        wrapBlockWithTypeIdentifierAttributesAndGetConfig(element);
        return element[0].outerHTML;
    }

    function getBlockLabel(block) {
        const blockConfiguration = blockConfigurationService.getBlockConfiguration(block);
        return blockConfiguration.groups.map(g => g.name).join(', ') || stripoApi.translate(PREVIEW_LABEL);
    }

    function getDefaultSettingsPanelState(block) {
        return {
            blockConfig: blockConfigurationService.getBlockConfiguration(block)
        }
    }

    function onBlockCopy(sourceBlock, targetBlock) {
        let blockConfig = blockConfigurationService.getBlockConfigurationForCopiedBlock(targetBlock);
        blockConfig = wrapBlockWithTypeIdentifierAttributesAndGetConfig(targetBlock, blockConfig);
        updateLayout(targetBlock, blockConfig);
    }
   /**
     * Desc : Render Alert box
     */
    function renderAlertHtml(condition, idSelector, imageName, message, actionButtons) {
        closeAlertModal();
        const div = document.createElement('div');
        div.className = "alert-container";
        if (condition) {
            div.innerHTML = `
            <div class="alert-box">
                <div class="alert-box-inner-content-section">
                    <div class="alert-close" onclick="closeAlertModal()">
                        <img src="assets/images/close.svg" width="60%"/>
                    </div>
                    <div class="alert-icon-section">
                        <img src="assets/images/${imageName}.svg" class="alert-icon-image"/>
                    </div>   
                    <div id="alert-inner-content-text" class="alert-inner-content-text-section">${!Array.isArray(message) ? message : ''}</div>     
                </div>                                
            </div>`;
            actionButtonsLengthCondition(actionButtons.length, actionButtons, div);
            for (const selector of idSelector) {
                $(`#${selector}`).append(div);
                $(`#${selector}`).css("display", "block");
            }
            messageContent(message);
        } else {
            for (const selector of idSelector) {
                $(`#${selector}`).css("display", "none");
            }
        }
    }


    return {
        name: 'Order-Block',
        iconClass: 'es-icon-product',
        uniqueClassName: 'order-summary-block',
        canBeSavedToLibrary: true,
        settingsCssPath: '/assets/css/settings.css',
        previewCssPath: '/assets/css/preview.css',
        i18n: translations,
        blockName: 'Order Block',
        emptyContainerIcon: true,
        blockType: 'multi-orientation',
        blockConfigAttributeNames: [
            ATTR_NAME_BLOCK_CONFIGURATION
        ],
        controlsToCreate: [
            { control: blockGroupsControl }
        ],
        blockControls: [
            CONTROL_NAME_BLOCK_GROUPS
        ],

        isEnabled,
        emailInitialized,
        getBlockLayoutToDrop,
        blockDropped,
        getBlockLabel,
        getDefaultSettingsPanelState,
        onBlockCopy,
        updateLayout,
        wrapBlockWithTypeIdentifierAttributesAndGetConfig,
        updateBlockText,
        addBlockCustomAttibutes,
        blockConfigurationService
    }
}
