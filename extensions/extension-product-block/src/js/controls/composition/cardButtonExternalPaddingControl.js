import {CONTROL_NAME_CARD_BUTTON_EXTERNAL_PADDING} from '../../const';
import baseCompositionInternalControl from './baseCompositionInternalControl';

export default {
    ...baseCompositionInternalControl,
    name: CONTROL_NAME_CARD_BUTTON_EXTERNAL_PADDING,
    themeKey: 'buttonExternalPadding',

    getLabel() {
        return this.translate('settings.controls.cardButtonExternalPadding.label');
    },

    getMobileLabel() {
        return this.translate('settings.controls.cardButtonExternalPadding.mobile.label');
    },

    storeThemeValue(item, value) {
        item.theme[this.themeKey] = Object.assign({}, item.theme[this.themeKey], value);
    }
}
