import {CONTROL_NAME_BLOCK_PADDING} from '../const';
import baseControl from "./baseControl";

const DEFAULT_VALUES = {left: 20, top: 20, right: 20, bottom: 0};

export default {
    ...baseControl,
    name: CONTROL_NAME_BLOCK_PADDING,
    themeKey: 'blockPadding',

    getLabel() {
        return this.translate('settings.controls.blockPadding.label');
    },

    getMobileLabel() {
        return this.translate('settings.controls.blockPadding.mobile.label');
    },

    getPaddingStyleValue() {
        return this.panelState.blockConfig.theme && this.panelState.blockConfig.theme.blockPadding
            ? this.panelState.blockConfig.theme.blockPadding
            : {
                desktop: {...DEFAULT_VALUES},
                mobile: {...DEFAULT_VALUES}
            };
    },

    getDomElementsToApplyValue() {
        return this.initialDomElement.querySelectorAll('.esd-structure');
    },

    isControlVisible() {
        return this.isValuableBlock();
    }
}
