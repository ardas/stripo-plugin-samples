import {CONTROL_NAME_CARD_TEXT_PADDING} from '../../const';
import baseCompositionInternalControl from './baseCompositionInternalControl';

export default {
    ...baseCompositionInternalControl,
    name: CONTROL_NAME_CARD_TEXT_PADDING,
    themeKey: 'textPadding',
    switchControlId: 'spacingsText',

    initializeCompositionInternalControl(variable, visibilityAreaSelector) {
        this.variable = variable;
        this.visibilityAreaSelector = visibilityAreaSelector;
        this.switchControlId = `${this.variable}Padding`;
    },


    storeThemeValue(item, value) {
        item.theme[this.themeKey] = Object.assign({}, item.theme[this.themeKey], value);
    }
}
