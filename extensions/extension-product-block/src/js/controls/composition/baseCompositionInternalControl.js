import baseControl from "../baseControl";

export default {
    ...baseControl,

    getDomElementsToApplyValue() {
        return this.initialDomElement.querySelectorAll(this.visibilityAreaSelector);
    },

    initializeCompositionInternalControl(variable, visibilityAreaSelector) {
        this.variable = variable;
        this.visibilityAreaSelector = visibilityAreaSelector;
    },

    getThemeValueFromConfig() {
        const item = this.getVariableItem();
        return item.theme ? item.theme[this.themeKey] : null;
    },

    controlValueUpdated(themeValue) {
        const item = this.getVariableItem();
        if (!item.theme) {
            item.theme = {};
        }
        this.storeThemeValue(item, themeValue);
        this.updateBlockConfiguration();
    },

    storeThemeValue(item, value) {
        item.theme[this.themeKey] = value;
    },

    applyThemeFromConfig() {
        if (!this.isControlVisible()) {
            return;
        }
        this.updateControlValue(this.getThemeValueFromConfig());
    },

    getVariableItem() {
        return this.panelState.blockConfig.composition.variables.find(item => item.variable == this.variable);
    },

    isControlVisible() {
        return this.isValuableBlock() && !this.getVariableItem().hidden;
    }
}
