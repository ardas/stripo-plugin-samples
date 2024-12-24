import {CONTROL_NAME_BLOCK_ADAPT} from '../const';
import baseControl from './baseControl';

export default {
    ...baseControl,
    name: CONTROL_NAME_BLOCK_ADAPT,
    themeKey: 'blockAdapt',
    defaultValue: {adapt: 'true'},

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
        return this.getValueFromElementOrConfigOrDefault();
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
