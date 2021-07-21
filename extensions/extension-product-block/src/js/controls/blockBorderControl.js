import {CONTROL_NAME_BLOCK_BORDER} from '../const';
import baseControl from "./baseControl";

const DEFAULT_STYLES = {
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: undefined
};

export default {
    ...baseControl,
    name: CONTROL_NAME_BLOCK_BORDER,
    themeKey: 'blockBorder',

    getLabel() {
        return this.translate('settings.controls.blockBorder.label');
    },

    getBorderStyleValue() {
        return this.panelState.blockConfig.theme && this.panelState.blockConfig.theme.blockBorder
                ? this.panelState.blockConfig.theme.blockBorder
                : {
                    top: {...DEFAULT_STYLES},
                    right: {...DEFAULT_STYLES},
                    bottom: {...DEFAULT_STYLES},
                    left: {...DEFAULT_STYLES}
                };
    },

    getTargetElements() {
        return [this.initialDomElement];
    },

    isControlVisible() {
        return this.isValuableBlock();
    }
}
