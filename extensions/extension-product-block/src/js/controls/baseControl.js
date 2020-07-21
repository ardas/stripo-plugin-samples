import {EVENT_NAME_LAYOUT_CHANGED} from '../const';

export default {
    onActivated() {
        this.registerSettingsEventListener(EVENT_NAME_LAYOUT_CHANGED, this.layoutChanged.bind(this));
    },

    layoutChanged() {
        this.applyThemeFromConfig();
        this.updateControlVisibility();
    },

    applyThemeFromConfig() {
        if (this.themeKey && this.isControlVisible() && this.panelState.blockConfig.theme[this.themeKey]) {
            this.updateControlValue(this.panelState.blockConfig.theme[this.themeKey]);
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