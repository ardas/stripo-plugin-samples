import {CONTROL_NAME_CARD_BORDER, ORIENTATION_HORIZONTAL} from '../const';
import baseControl from "./baseControl";

const DEFAULT_STYLES = {
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: undefined
};

export default {
    ...baseControl,
    name: CONTROL_NAME_CARD_BORDER,
    themeKey: 'border',

    getBorderStyleValue() {
        return this.panelState.blockConfig.theme && this.panelState.blockConfig.theme.border
                ? this.panelState.blockConfig.theme.border
                : {
                    top: {...DEFAULT_STYLES},
                    right: {...DEFAULT_STYLES},
                    bottom: {...DEFAULT_STYLES},
                    left: {...DEFAULT_STYLES}
                };
    },

    getTargetElements() {
        return this.panelState.blockConfig.orientation == ORIENTATION_HORIZONTAL
            ? this.initialDomElement.querySelectorAll('.esd-structure')
            : this.initialDomElement.querySelectorAll('.esd-container-frame:not(.esd-ignore-theme-settings)>table');
    },

    isControlVisible() {
        return this.isValuableBlock();
    }
}