import {CONTROL_NAME_CARD_BUTTON_STYLE} from '../../const';
import baseCompositionInternalControl from './baseCompositionInternalControl';

export default {
    ...baseCompositionInternalControl,
    name: CONTROL_NAME_CARD_BUTTON_STYLE,
    themeKey: 'buttonStyle',

    storeThemeValue(item, value) {
        item.theme[this.themeKey] = Object.assign({}, item.theme[this.themeKey], value);
    }
}