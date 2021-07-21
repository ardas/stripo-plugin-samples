import {CONTROL_NAME_CARD_BUTTON_INTERNAL_PADDING} from '../../const';
import baseCompositionInternalControl from './baseCompositionInternalControl';

export default {
    ...baseCompositionInternalControl,
    name: CONTROL_NAME_CARD_BUTTON_INTERNAL_PADDING,
    themeKey: 'buttonInternalPadding',

    storeThemeValue(item, value) {
        item.theme[this.themeKey] = Object.assign({}, item.theme[this.themeKey], value);
    },

    layoutChanged() {
        this.applyThemeFromConfig();
        this.updateControlVisibility();
    }
}
