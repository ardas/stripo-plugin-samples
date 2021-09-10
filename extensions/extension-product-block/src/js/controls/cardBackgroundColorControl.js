import {CONTROL_NAME_CARD_BACKGROUND_COLOR, ORIENTATION_HORIZONTAL} from '../const';
import baseControl from "./baseControl";

export default {
    ...baseControl,
    name: CONTROL_NAME_CARD_BACKGROUND_COLOR,
    themeKey: 'bgColor',

    getLabel() {
        return this.translate('settings.controls.bgColor.label');
    },

    getInitialColor() {
        return this.panelState.blockConfig.theme && this.panelState.blockConfig.theme.bgColor
                ? this.panelState.blockConfig.theme.bgColor.color
                : 'transparent';
    },

    getDomElementsToApplyValue() {
        return this.panelState.blockConfig.orientation == ORIENTATION_HORIZONTAL
            ? this.initialDomElement.querySelectorAll('.esd-structure')
            : this.initialDomElement.querySelectorAll('.esd-container-frame:not(.esd-ignore-theme-settings)>table');
    },

    isControlVisible() {
        return this.isValuableBlock();
    }
}
