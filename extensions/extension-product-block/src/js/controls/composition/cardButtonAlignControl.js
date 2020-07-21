import {CONTROL_NAME_CARD_BUTTON_ALIGN, ORIENTATION_VERTICAL} from '../../const';
import baseCompositionInternalControl from './baseCompositionInternalControl';

export default {
    ...baseCompositionInternalControl,
    name: CONTROL_NAME_CARD_BUTTON_ALIGN,
    themeKey: 'buttonAlign',

    isControlVisible() {
        return this.panelState.blockConfig.orientation == ORIENTATION_VERTICAL &&
            this.isValuableBlock() &&
            !this.getVariableItem().hidden;
    },

    storeThemeValue(item, value) {
        item.theme[this.themeKey] = Object.assign({}, item.theme[this.themeKey], value);
    }
}