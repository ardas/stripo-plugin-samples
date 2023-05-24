import {CONTROL_NAME_CARD_TEXT_STYLE} from '../../const';
import baseCompositionInternalControl from './baseCompositionInternalControl';

export default {
    ...baseCompositionInternalControl,
    name: CONTROL_NAME_CARD_TEXT_STYLE,
    themeKey: 'textStyle',
    underlineAvailable: true,

    getDomElementsToApplyValue() {
        return this.initialDomElement.querySelectorAll(`${this.visibilityAreaSelector} p`);
    },

    storeThemeValue(item, value) {
        item.theme[this.themeKey] = Object.assign({}, item.theme[this.themeKey], value);
    }
}