import {CONTROL_NAME_BLOCK_ADAPT} from '../const';
import baseControl from './baseControl';

export default {
    ...baseControl,
    name: CONTROL_NAME_BLOCK_ADAPT,
    themeKey: 'blockAdapt',

    getLabel() {
        return this.translate('settings.controls.blockAdapt.label');
    },

    getDescriptionOnLabel() {
        return this.translate('settings.controls.blockAdapt.on');
    },

    getDescriptionOffLabel() {
        return this.translate('settings.controls.blockAdapt.off');
    },

    getAdaptValue() {
        return this.panelState.blockConfig.theme && this.panelState.blockConfig.theme.blockAdapt
            ? this.panelState.blockConfig.theme.blockAdapt
            : {'adapt': true};
    },

    applyThemeFromConfig() {
        this.updateControlValue(this.getAdaptValue());
    },

    getDomElementsToApplyValue() {
        return this.initialDomElement.querySelectorAll('.esd-structure');
    },

    isControlVisible() {
        return this.isValuableBlock();
    }
}
