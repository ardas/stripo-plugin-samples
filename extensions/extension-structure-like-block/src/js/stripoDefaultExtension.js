export default {
    name: null,
    iconClass: null,
    uniqueClassName: null,
    canBeSavedToLibrary: false,
    settingsCssPath: null,
    previewCssPath: null,
    i18n: {},
    blockName: null,
    emptyContainerIcon: false,
    blockType: null,
    blockConfigAttributeNames: [],
    controlsToCreate: [],
    blockControls: [],

    isEnabled() {
        return true;
    },

    emailInitialized(emailBody) {
    },

    onSelectBlock(block) {
    },

    getBlockLayoutToDrop() {
        return '<td>Default block</td>';
    },

    blockDropped(block) {
    },

    getBlockLabel() {
        return 'Default block'
    },

    getDefaultSettingsPanelState() {
        return {};
    },

    onCleanLayout(bodyCheerioWrapper, cheerio) {
    },

    onBlockCopy(sourceBlock, targetBlock) {
    }
}
