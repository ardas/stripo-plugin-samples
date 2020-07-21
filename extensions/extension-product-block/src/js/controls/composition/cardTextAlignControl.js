import {CONTROL_NAME_CARD_TEXT_ALIGN} from '../../const';
import baseCompositionInternalControl from './baseCompositionInternalControl';

export default {
    ...baseCompositionInternalControl,
    name: CONTROL_NAME_CARD_TEXT_ALIGN,
    themeKey: 'textAlign',

    storeThemeValue(item, value) {
        item.theme[this.themeKey] = Object.assign({}, item.theme[this.themeKey], value);
    }
}