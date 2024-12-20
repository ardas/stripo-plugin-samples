import {EVENT_NAME_LAYOUT_CHANGED} from '../const';
import {isEqual} from "lodash";

export default {
    defaultValue: null,
    onActivated() {
        this.registerSettingsEventListener(EVENT_NAME_LAYOUT_CHANGED, this.layoutChanged.bind(this));
        const valueFromElement = typeof this.getValueFromElement === 'function' ? this.getValueFromElement() : null;
        if (!this.isValueEmpty(valueFromElement) && !isEqual(valueFromElement, this.getThemeValueFromConfig())) {
            this.controlValueUpdated(valueFromElement);
            this.applyChanges();
        }
    },

    getValueFromElementOrConfigOrDefault() {
        const valueFromElement = this.getValueFromElement();
        if (!this.isValueEmpty(valueFromElement)) {
            return valueFromElement;
        }
        const valueFromConfig = this.getThemeValueFromConfig();
        if (valueFromConfig){
            return valueFromConfig;
        }
        return this.defaultValue;
    },


    isValueEmpty(value) {
        return value === null || value === undefined;
    },

    layoutChanged() {
        this.applyThemeFromConfig();
        this.updateControlVisibility();
    },

    applyThemeFromConfig() {
        if (!this.isControlVisible()) {
            return;
        }
        this.updateControlValue(this.getThemeValueFromConfig());
    },

    getThemeValueFromConfig() {
        if (this.themeKey && this.panelState.blockConfig.theme[this.themeKey]) {
            return this.panelState.blockConfig.theme[this.themeKey];
        }
    },

    controlValueUpdated(value) {
        if (this.themeKey) {
            this.panelState.blockConfig.theme[this.themeKey] = value;
            this.updateBlockConfiguration();
        }
    },

    updateLayout() {
        this.extension.updateLayout(this.jElement, this.panelState.blockConfig);
    },

    updateBlockConfiguration() {
        this.extension.blockConfigurationService.setBlockConfiguration(this.jElement, this.panelState.blockConfig);
    },

    translate(key, params) {
        return this.extension.stripoApi.translate(key, params);
    },

    isValuableBlock() {
        return !!this.panelState.blockConfig.groups.length;
    }
}
